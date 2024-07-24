
import requests


class TestDaily:

    url = 'http://127.0.0.1:8080/daily'

    def test_get(self):
        res = requests.get(self.url)
        assert res.status_code == 200
        assert res.json()['id'] != None
        assert res.json()['date'] != None
        assert res.json()['seed'] != None
        assert res.json()['word'] != None
        return res.json()['id']

if __name__ == '__main__':
    test = TestDaily()
    test.test_get()