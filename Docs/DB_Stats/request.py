import requests
import pandas as pd
username = 'MISCHEL.ESCOBAR'
password = '2023MISC'
bodegas =['XLEVEL BODEGA','B. X LEVEL L40', 'B. X LEVEL L28']
auth = 'https://api.getsoft.app/login/validateAccess'
headers = {'content-type': 'application/x-www-form-urlencoded'}
data = {
    'login':f"{username}",
    'clave':f'{password}'
}
token =list()
try:
    with requests.post(auth,data,headers=headers) as response:
        print(str(response))
        # print(str(response.json()))
        for bodega in bodegas:
            if response.json().get('success')==True:
                token.append(response.json().get('token'))
                url = f'https://api.getsoft.app/login/filterCellar/{token[0]}'
                print(url)
                data2={
                    "bodega":f"{bodega}",
                    "categoria": "",
                    "codigo": "",
                    "producto": "",
                }
                with requests.post(url, data2, headers=headers) as response:
                    print(str(response))
                    if response.json().get('success')==True:
                        # respuesta = response.json()
                        # print(str(respuesta))
                        df = pd.DataFrame.from_dict(
                            response.json().get('dataResponse'),
                            orient='columns',
                            )
                        print(df.tail())
                        df.to_csv(f'{bodega}.csv')
                    else:
                        print(response.json().get('mensaje'))
                        raise Exception
except Exception as e:
    print(str(e))
            
        # print(response.status_code,'\n', response.text,'\n', response.content,'\n', response.url,'\n', response.connection,'\n')