import requests
from test_user import TestUser
from test_daily import TestDaily

class TestDrawing:


    url = 'http://127.0.0.1:8080/drawing'

    def test_create(self, user_id: str, daily_id: str) -> str:
        headers = {
            'accept': 'application/json',
            'Content-Type': 'application/json'
        }
        data = {
            "user": user_id,
            "daily": daily_id,
            "image": "test_image",
            "description": "test_description"
        }
        response = requests.post(self.url, headers=headers, json=data)

        assert response.status_code == 201
        assert response.json()['user']['id'] == user_id
        assert response.json()['daily']['id'] == daily_id
        assert response.json()['image'] == data['image']
        assert response.json()['description'] == data['description']

        # assert no email or password
        if 'email' in response.json() or 'password' in response.json():
            assert False

        return response.json()['id']
    
    def get_drawing(self, drawing_id: str) -> None:
        response = requests.get(f'{self.url}/{drawing_id}')
        assert response.status_code == 200
        assert response.json()['id'] == drawing_id
        assert response.json()['image'] != None
        assert response.json()['description'] != None

    def get_drawing_404(self, drawing_id: str) -> None:
        response = requests.get(f'{self.url}/{drawing_id}')
        assert response.status_code == 404

    def get_all_drawings(self) -> None:
        response = requests.get(self.url)
        assert response.status_code == 200
        assert len(response.json()) > 0

    def like_drawing(self, drawing_id: str) -> None:
        headers = {
            'accept': 'application/json',
            'Content-Type': 'application/json'
        }
        data = {
            "user": user_id,
        }
        response = requests.post(f'{self.url}/{drawing_id}/like', headers=headers, json=data)
        assert response.status_code == 200
        assert response.json()['likes'] > 0

    def unlike_drawing(self, drawing_id: str) -> None:
        headers = {
            'accept': 'application/json',
            'Content-Type': 'application/json'
        }
        data = {
            "user": user_id,
        }
        response = requests.post(f'{self.url}/{drawing_id}/dislike', headers=headers, json=data)
        assert response.status_code == 200
        assert response.json()['dislikes'] > 0

    def delete_drawing(self, drawing_id: str) -> None:
        response = requests.delete(f'{self.url}/{drawing_id}')
        assert response.status_code == 204

if __name__ == '__main__':
    testUser = TestUser()
    testDaily = TestDaily()
    user_id = testUser.create_user()
    daily_id = testDaily.test_get()

    test = TestDrawing()
    id = test.test_create(user_id, daily_id)
    test.get_drawing(id)
    test.get_drawing_404('123456789')
    test.get_all_drawings()
    # test.like_drawing(id)
    # test.unlike_drawing(id)
    test.delete_drawing(id)
    testUser.delete_user(user_id)
    


