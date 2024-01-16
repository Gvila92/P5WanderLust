from random import choice
from faker import Faker
from app import app
from models import db, User, BlogPost, Comment, Like, Tag

fake = Faker()

def seed_users(num_users=10):
    users = []
    for _ in range(num_users):
        user = User(username=fake.user_name(), email=fake.email(), password=fake.password())
        users.append(user)
    return users

def seed_blog_posts(num_posts=20):
    posts = []
    for _ in range(num_posts):
        post = BlogPost(title=fake.sentence(), content=fake.paragraph(), author_id=choice(users).id)
        posts.append(post)
    return posts

def seed_comments(num_comments=50):
    comments = []
    for _ in range(num_comments):
        comment = Comment(text=fake.text(), author_id=choice(users).id, post_id=choice(posts).id)
        comments.append(comment)
    return comments

def seed_likes(num_likes=100):
    likes = []
    for _ in range(num_likes):
        like = Like(user_id=choice(users).id, post_id=choice(posts).id)
        likes.append(like)
    return likes

def seed_tags(num_tags=5):
    tags = []
    for _ in range(num_tags):
        tag = Tag(name=fake.word())
        tags.append(tag)
    return tags

if __name__ == '__main__':
    with app.app_context():
        print("Starting seed...")

        # Seed users
        users = seed_users()
        db.session.add_all(users)
        db.session.commit()

        # Seed blog posts
        posts = seed_blog_posts()
        db.session.add_all(posts)
        db.session.commit()

        # Seed comments
        comments = seed_comments()
        db.session.add_all(comments)
        db.session.commit()

        # Seed likes
        likes = seed_likes()
        db.session.add_all(likes)
        db.session.commit()

        # Seed tags
        tags = seed_tags()
        db.session.add_all(tags)
        db.session.commit()

        print("Seed complete!")
