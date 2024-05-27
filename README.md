# EventQ Application

# Tech Stack (Web Application)
- Backend: Python (Flask)
- Frontend: React with TypeScript and Tailwind CSS
- Database: MongoDB 
---
# Running the Application
## 1. Create A Virtual Environment
1. ```conda create -n qyay python=3.9```
2. ```conda activate qyay```
3. ```pip install -r requirements.txt```
## 2. Run the Backend
1. ```cd backend```
2. ```python run.py```
3. Open ```http://localhost:5001/``` in your browser
## 3. Run the Frontend
1. ```cd frontend```
2. ```npm install```
3. ```npm start```
4. Open ```http://localhost:3000/``` in your browser
## 4. Access API Endpoints
### Auth
#### `/signup`
- Method: POST
- Description: Sign up a new user.
- Request Body: ```{
  "email": "example@example.com",
  "password": "password123"
}```
#### `/signin`
- Method: POST
- Description: Sign in a user.
- Request Body: ```{
  "email": "example@example.com",
  "password": "password123"
}```
- Returns: JWT access token.
### Events
#### `/create_event`
- Method: POST
- Description: Create a new event.
- Request Body: ```{
    "details": {
        "date": "0000-00-00",
        "description": "Text Here.",
        "location": "Text Here."
    },
    "name": "Text Here.",
    "organizerEmail": "Text Here.",
    "timestamp": "Text Here."
}```
- Requirements: JWT authentication.
#### `/events`
- Method: GET
- Description: Get a list of events created by the authenticated organizer.
- Requirements: JWT authentication.
#### `/events/<event_id>`
- Method: GET
- Description: Get details of a specific event.
#### `/events/<event_id>`
- Method: DELETE
- Description: Delete a specific event created by the authenticated organizer.
- Requirements: JWT authentication.
#### `/events/join/<unique_code>`
- Method: GET
- Description: Join an event using a unique code.
#### `/events/<event_id>/feedback`
- Method: POST
- Description: Submit feedback for a specific event.
#### `/events/<event_id>/feedback`
- Method: GET
- Description: Get feedback for a specific event.
### Questions
#### `/events/<event_id>/questions`
- Method: GET
- Description: Get a list of questions for a specific event.
#### `/questions/<question_id>/upvote`
- Method: PUT
- Description: Upvote a specific question.
#### `/events/<event_id>/questions`
- Method: POST
- Description: Submit a question for a specific event.