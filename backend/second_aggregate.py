import requests
import parse
import re

token = "1d8bb5cdc38801197879cc1f659516bbbaf0c01b771800b86b1ab1d2a19be906c5e5f980c06a522eff3a6"
API_URL = "https://api.vk.com/method/"
v = "5.103"

def call_api(method, data = {}, json=True): # helper for vk api
    d = {
        "access_token": token,
        "v": v
    }
    d.update(data)
    r = requests.post(API_URL + method, data=d)
    if json:
        return r.json()["response"]
    return r

def sizes_string_to_7_array(s): # [XXS, XS, S, M, L, XL, XXL]
    a = [0] * 7
    s = s.strip().replace("М", "M").replace("Х", "X") # кириллица
    ss = filter(None, re.split("[^\w-]", s))
    for potential_size in ss:
        if not re.match("^[XSML]+$", potential_size):
            #print("No: " + potential_size)
            continue
        #print("Yes: " + potential_size)
        sna = potential_size.split('-')
        if len(sna) == 2: # если есть дефис
            size_start = sizes.index(sna[0])
            size_end = sizes.index(sna[1])
            if size_end < size_start:
                size_start, size_end = size_end, size_start
            for i in range(size_start, size_end + 1):
                a[i] = 1
        if len(sna) == 1: # если его нет
            a[sizes.index(potential_size)] = 1
    return a

romashkino_id = -165202670 
resp = call_api("market.get", {"owner_id": romashkino_id, "count": 200}, json=True)
sizes = ["XXS", "XS", "S", "M", "L", "XL", "XXL"] # возможные размеры
items = [] # наши товары
for item in resp["items"]:
    item_result = dict() # товар, в том виде, в котором он будет отправлен на бэк
    desc = item["description"]
    parse_gen = (parse.parse("Размер:{:s}{size}{:s}", line) or parse.parse("Размер:{:s}{size}", line) for line in desc.split("\n"))
    item_size = [0] * 7
    for line in parse_gen:
        if line is None:
            continue # чтобы избежать слишком большого уровня вложенности использую continue для обратного условия
        sn =  line.named['size'] # size name
        item_size = sizes_string_to_7_array(sn)
        item_result['size'] = item_size
    item_result['description'] = desc.replace("_", "")#.replace("\n", "<br />")
    item_result['name'] = item['title']
    item_result['price'] = int(item['price']['amount']) // 100
    item_result['img'] = item['thumb_photo']
    item_result['url'] = 'https://m.vk.com/product{shop}_{item}'.format(**{"shop": romashkino_id, "item": item['id']} )
    item_result['shop'] = 'РОМАШКИНО'
    items.append(item_result)

kostrov_id = -15804918
items_got = list()
items_total = 400 # любое значение, которое больше 200
items_processed = 0
while items_processed < items_total:
    resp_kostrov = call_api("market.get", {"owner_id": kostrov_id, "count": 200, "offset": items_processed})
    items_processed += 200
    items_total = resp_kostrov['count'] # это каждый раз одно и то же значение, но нам важно, чтобы на первой итерации произошло изменение
    items_got.extend(resp_kostrov['items']) 
sizes_kostrov = dict()
for item_got in items_got:
    size = parse.parse("{}размер{:s}{size}", item_got['title'])
    if size is None:
        continue
    items.append({
        "description": item_got["description"],#.replace("\n", "<br />"),
        "name": item_got["title"],
        "price": int(item_got["price"]["amount"]) // 100,
        "img": item_got["thumb_photo"],
        "size": sizes_string_to_7_array(size.named['size']),
        "shop": "Костров",
        "url": "https://m.vk.com/product{shop}_{item}".format(**{"shop": kostrov_id, "item": item_got['id']} )
    })

OUR_URL = "http://192.168.43.76:8080/" # uploading to our server
print("reached sending")
print(len(items))

for item in items:
    r = requests.post(OUR_URL + "items",
                      json = item,
                      headers = {
                        'Content-Type': 'application/json'
                        })
