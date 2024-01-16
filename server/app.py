from flask import Flask, request, jsonify,make_response
from flask_restful import Resource, Api
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin
from config import app, db
from flask_bcrypt import Bcrypt
from models import User, BlogPost

api = Api(app)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000", "methods": ["GET", "POST", "PUT", "DELETE"], "allow_headers": ["Content-Type", "Authorization"]}})
bcrypt = Bcrypt(app)

with app.app_context():
    db.create_all()
#FULL CRUD for BlogPost
class BlogPostResource(Resource):
    def options(self):
        response = make_response()
        response.headers.add("Access-Control-Allow-Origin", "http://localhost:3000")
        response.headers.add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
        response.headers.add("Access-Control-Allow-Headers", "Content-Type, Authorization")
        return response

    def get(self, blog_post_id):
        blog_post = BlogPost.query.get(blog_post_id)
        if blog_post:
            return blog_post.to_dict()
        return {"message": "Blog post not found"}, 404

    def post(self):
        data = request.form
        title = data['title']
        content = data['content']
        location = data.get('location', '')
        user_id = data['user_id']

        new_blog_post = BlogPost(title=title, content=content, location=location, user_id=user_id)

        if 'image' in request.files:
            image = request.files['image']
            # Save the image file to your desired location or process it accordingly

        db.session.add(new_blog_post)
        db.session.commit()
        return {"message": "Blog post created successfully"}
    
    def put(self, blog_post_id):
        blog_post = BlogPost.query.get(blog_post_id)
        if blog_post:
            data = request.form
            blog_post.title = data.get('title', blog_post.title)
            blog_post.content = data.get('content', blog_post.content)
            blog_post.location = data.get('location', blog_post.location)

            if 'image' in request.files:
                image = request.files['image']
                # Update the image file or process it accordingly

            db.session.commit()
            return {"message": "Blog post updated successfully"}
        return {"message": "Blog post not found"}, 404

    def delete(self, blog_post_id):
        blog_post = BlogPost.query.get(blog_post_id)
        if blog_post:
            db.session.delete(blog_post)
            db.session.commit()
            return {"message": "Blog post deleted successfully"}
        return {"message": "Blog post not found"}, 404

class MyBlogsResource(Resource):
    def get(self):
        blogs = BlogPost.query.all()
        blogs_data = [blog.to_dict() for blog in blogs]
        return jsonify(blogs_data)

api.add_resource(BlogPostResource, '/blog_posts/<int:blog_post_id>')
api.add_resource(MyBlogsResource, '/Myblogs')

class SignupResource(Resource):
    def post(self):
        data = request.get_json()
        hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
        new_user = User(username=data['username'], email=data['email'], password=hashed_password)
        db.session.add(new_user)
        db.session.commit()
        return {"message": "User registered successfully"}

class LoginResource(Resource):
    def post(self):
        data = request.get_json()
        user = User.query.filter_by(email=data['email']).first()
        if user and bcrypt.check_password_hash(user.password, data['password']):
            return {"message": "Login successful"}
        else:
            return {"message": "Login failed. Check your email and password."}, 401

api.add_resource(SignupResource, '/signup')
api.add_resource(LoginResource, '/login')

@app.route('/')
def index():
    return '<h1>WanderLust</h1>'

if __name__ == '__main__':
    app.run(port=5555, debug=True)
