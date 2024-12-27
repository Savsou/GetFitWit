from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


def seed_users():

    users_data = [
        {
            'username': 'Demoman',
            'email': 'demoman@example.com',
            'password': 'hashedpassword1',
            'bio': 'Hello, I am Demoman!',
            'profileImageUrl': 'https://res.cloudinary.com/dt3unm9lt/image/upload/v1733455083/cld-sample-5.jpg',
        },
        {
            'username': 'Demo',
            'email': 'Demo@example.com',
            'password': 'hashedpassword2',
            'bio': 'Welcome I am Demo!',
        },
        {
            'username': 'Bemo',
            'email': 'bemo@example.com',
            'password': 'hashedpassword3',
            'bio': 'Bemo is life!',
        },
        {
            'username': 'Bemoman',
            'email': 'bemoman@example.com',
            'password': 'hashedpassword4',
            'bio': 'Bemoman is here!',
        },
        {
            'username': 'Temo',
            'email': 'temo@example.com',
            'password': 'hashedpassword5',
            'bio': "I'm just Temo!",
        },
        {
            'username': 'Teemo',
            'email': 'teemo@example.com',
            'password': 'hashedpassword6',
            'bio': 'Teemo!',
        },
        {
            'username': 'Gekko',
            'email': 'gekko@example.com',
            'password': 'hashedpassword7',
            'bio': 'Hey little buddies! Gekko here!',
        },
        {
            'username': 'Geicko',
            'email': 'geicko@example.com',
            'password': 'hashedpassword8',
            'bio': 'Geicko with me!',
        },
        {
            'username': 'Mr. Universe',
            'email': 'mruniverse@example.com',
            'password': 'hashedpassword9',
            'bio': 'I am your Universe!',
        },
        {
            'username': 'World',
            'email': 'world@example.com',
            'password': 'hashedpassword10',
            'bio': 'I am your World!',
        },
        {
            'username': 'Atlas',
            'email': 'atlas@example.com',
            'password': 'hashedpassword11',
            'bio': 'I will hold the world up!',
        },
        {
            'username': 'Hercules',
            'email': 'hercules@example.com',
            'password': 'hashedpassword12',
            'bio': 'Hercules! Hercules!',
        },
        {
            'username': 'Juandissimo',
            'email': 'juandissimo@example.com',
            'password': 'hashedpassword13',
            'bio': 'Look at me!',
        },
        {
            'username': 'Goku',
            'email': 'goku@example.com',
            'password': 'hashedpassword14',
            'bio': 'Haaaaaaaaa!',
        },
        {
            'username': 'Superman',
            'email': 'superman@example.com',
            'password': 'hashedpassword15',
            'bio': "Krypto",
        },
        {
            'username': 'Batman',
            'email': 'bataman@example.com',
            'password': 'hashedpassword16',
            'bio': 'I am Batman!',
        },
        {
            'username': 'Saitama',
            'email': 'saitama@example.com',
            'password': 'hashedpassword17',
            'bio': 'Serious',
        },
        {
            'username': 'Ares',
            'email': 'ares@example.com',
            'password': 'hashedpassword18',
            'bio': 'WAR!',
        },
        {
            'username': 'Thor',
            'email': 'thor@example.com',
            'password': 'hashedpassword19',
            'bio': 'Thor is here',
        },
        {
            'username': 'Achilles',
            'email': 'achilles@example.com',
            'password': 'hashedpassword20',
            'bio': 'Trojan works',
        }
    ]

    #bulk_insert_mappings does not let passsword hashing happen because it bypasses the model instantiation. Our @password.setter needs to happen on each user.
    users = [User(**data) for data in users_data]
    db.session.add_all(users)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
