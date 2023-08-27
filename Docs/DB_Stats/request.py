import requests
import pandas as pd
# username = 'MISCHEL.ESCOBAR'
# password = '2023MISC'
username = "w0lf3ns"
password = "@nDREE1%"

bodegas =['XLEVEL BODEGA','B. X LEVEL L40', 'B. X LEVEL L28']
auth = 'https://api.getsoft.app/login/validateAccess'
headers = {'content-type': 'application/x-www-form-urlencoded'}
data = {
    'login':f"{username}",
    'clave':f'{password}'
}
token ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IncwbGYzbnM3IiwiZXhwIjoxNjkyOTA3MzEwLCJvcmlnSWF0IjoxNjkyOTA3MDEwfQ.4eeH7_mZ2mfdfvHYQEXzMtoazj-NZ4OEyA5LQN1G-eU'

def graphAPI():
    with requests.post(
        'http://localhost:8089/api',
        json={"query": 
            """
                {
                mutation VerifyToken($token: String = "") {
                    verifyToken(token:$token){
                        payload
                    }
                    }
                }
            """,
            "variables":
            """
                {
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IncwbGYzbnMiLCJleHAiOjE2OTI5MDUwODAsIm9yaWdJYXQiOjE2OTI5MDQ3ODB9.NbIkSXgtYKL-Mt9mrP-0CSEh0m7xq437JhGzNSkFW5E"
                }
            """
            }
           
        ,
        headers={
            'content-type': 'application/application/json',
            'Authorization':f'JWT {token}'
        }
    ) as response:
        print(str(response))
        print(str(response.json()))

def xlevelApi():
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



graphAPI()