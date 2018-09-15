import requests

for i in range(10, 100):
    r = requests.post('http://40.76.211.223:3000/fitbit', data = {'body':[i,i+2,i+1,i+4,i-2]})
