import requests

class TestUser:

    url = 'http://127.0.0.1:8080/users'

    def create_user(self) -> str:
        headers = {
            'accept': 'application/json',
            'Content-Type': 'application/json'
        }
        data = {
            "background": "test_background",
            "email": "test_email",
            "password": "test_password",
            "profile_picture": "test_profile_picture",
            "username": "test_username"
        }
        response = requests.post(self.url, headers=headers, json=data)

        assert response.status_code == 201
        assert response.json()["user"]['username'] == data['username']
        assert response.json()["user"]['profile_picture'] == data['profile_picture']
        assert response.json()["user"]['background'] == data['background']

        # assert no email or password
        try:
            email = response.json()["user"]['email']
            password = response.json()["user"]['password']
        except KeyError:
            pass

        return response.json()["user"]['id']
    

    def get_user(self, user_id: str) -> None:
        response = requests.get(f'{self.url}/{user_id}')
        assert response.status_code == 200
        assert response.json()['id'] == user_id

    def get_user_404(self, user_id: str) -> None:
        response = requests.get(f'{self.url}/{user_id}')
        assert response.status_code == 404

    def get_all_users(self) -> None:
        response = requests.get(self.url)
        assert response.status_code == 200
        assert len(response.json()) > 0

    def update_user(self, user_id: str) -> None:
        headers = {
            'accept': 'application/json',
            'Content-Type': 'application/json'
        }
        data = {
            "background": "test_background_updated",
            "email": "test_email_updated",
            "password": "test_password_updated",
            "profile_picture": "test_profile_picture_updated",
            "username": "test_username_updated"
        }
        response = requests.patch(f'{self.url}/{user_id}', headers=headers, json=data)

        assert response.status_code == 200

        # assert no email or password
        try:
            email = response.json()['email']
            password = response.json()['password']
        except KeyError or AssertionError:
            pass

    def delete_user(self, user_id: str) -> None:
        response = requests.delete(f'{self.url}/{user_id}')
        assert response.status_code == 204

if __name__ == '__main__':
    test = TestUser()
    user_id = test.create_user()
    print(user_id)
    test.get_user(user_id)
    test.get_all_users()
    test.update_user(user_id)
    test.delete_user(user_id)
    test.get_user_404(user_id)

