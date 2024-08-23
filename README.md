# Roulettech Weather App

Roulettech Weather App is a comprehensive weather application designed to provide users with up-to-date weather information for multiple locations. The application features user authentication, location management, and real-time weather updates.

## Features

- **User Authentication**: Users can sign up, log in, and manage their accounts.
- **Location Management**: Add, delete, and view weather information for multiple locations.
- **Persistent Data**: Saved locations are retained across sessions and displayed upon user login.
- **Real-Time Updates**: Refresh weather data for each location from the home page.

## Technologies

- **Frontend**: Built with [React](https://reactjs.org/), utilizing [Redux](https://redux.js.org/) for state management and [React Router](https://reactrouter.com/) for navigation.
- **Backend**: Developed with [Django](https://www.djangoproject.com/) and [Django REST framework](https://www.django-rest-framework.org/) to handle API requests.
- **Database**: Uses [SQLite](https://www.sqlite.org/index.html) for local storage of user data and location information.
- **Styling**: The user interface is styled using CSS.
- **Security**: Implemented a [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) policy on the backend to enhance security.

## Setup and Installation

To get started with this project, follow these steps:

### Backend

1. **Clone the repository**:

    ```bash
    git clone https://github.com/your-username/roulettech-weather-app.git
    cd roulettech-weather-app/backend
    ```

2. **Create a virtual environment**:

    ```bash
    python -m venv env
    source env/bin/activate  # On Windows use `env\Scripts\activate`
    ```

3. **Install dependencies**:

    ```bash
    pip install -r requirements.txt
    ```

4. **Run migrations**:

    ```bash
    python manage.py migrate
    ```

5. **Start the server**:

    ```bash
    python manage.py runserver
    ```

### Frontend

1. **Navigate to the frontend directory**:

    ```bash
    cd ../frontend
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Start the development server**:

    ```bash
    npm start
    ```

## Configuration

- Ensure the `apiBaseUrl` in your frontend configuration matches the backend server URL.

## Contributing

Feel free to open issues or submit pull requests if you have suggestions or improvements.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
