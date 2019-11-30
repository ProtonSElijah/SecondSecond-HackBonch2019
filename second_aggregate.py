import requests
import parse
import re

token = "606fa1164d16e379c7610e48c15f9cb73ebb75215c67f0630959b877ab98748b0fde0d38853f233df5c93"
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
            continue # чтобы избежать слишком большого уровня вложенности
        sn1 =  line.named['size'] # size name
        sn = re.sub('[^XSMLМХ-]', '', sn1).replace('М', 'M').replace('Х', 'X') # избавляемся от кириллицы
        sna = sn.split('-') # array of sizes
        if sn == '':
            continue
        #for size in sizes:
        #    item_result["size_" + size] = 0
        if len(sna) == 2:
            size_start = sizes.index(sna[0])
            size_end = sizes.index(sna[1])
            if size_end < size_start:
                size_start, size_end = size_end, size_start
            for size in range(size_start, size_end + 1):
                #item_result["size_" + sizes[size]] = 1
                item_size[size] = 1
        if len(sna) == 1:
            item_size[sizes.index(sn)] = 1
        item_result['size'] = item_size
    item_result['description'] = desc
    item_result['name'] = item['title']
    item_result['price'] = int(item['price']['amount']) / 100
    item_result['img'] = item['thumb_photo']
    item_result['url'] = 'https://vk.com/market{shop}?w=product{shop}_{item}'.format(**{"shop": romashkino_id, "item": item['id']} )
    items.append(item_result)



OUR_URL = "http://192.168.43.76:8080/" # uploading to our server
# only first eight
i = 0
for item in items:
    i += 1
    if i<8:
        continue
    r = requests.post(OUR_URL + "items",
                      json = item,
                      headers = {
                        'Content-Type': 'application/json'
                        })
    if i > 8:
        pass
        #break
