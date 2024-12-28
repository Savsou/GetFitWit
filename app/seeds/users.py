from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


def seed_users():

    users_data = [
        {
            'username': 'Demoman',
            'email': 'demoman@example.com',
            'password': 'hashedpassword1',
            'bio': 'Hello, I am Demoman!',
            'profileImageUrl': 'https://res.cloudinary.com/dt3unm9lt/image/upload/v1735412910/GetFitWit/pfp/yaoacotppjwavof3nsha.jpg',
        },
        {
            'username': 'Demo',
            'email': 'Demo@example.com',
            'password': 'hashedpassword2',
            'profileImageUrl': 'https://res.cloudinary.com/dt3unm9lt/image/upload/v1735412911/GetFitWit/pfp/gh3yxoeqvwafrkzuaoki.jpg',
            'bio': 'Welcome I am Demo!',
        },
        {
            'username': 'Bemo',
            'email': 'bemo@example.com',
            'password': 'hashedpassword3',
            'profileImageUrl': 'https://res.cloudinary.com/dt3unm9lt/image/upload/v1735412911/GetFitWit/pfp/tqjyuormx4wqr3n1fnvq.jpg',
            'bio': 'Bemo is life!',
        },
        {
            'username': 'Bemoman',
            'email': 'bemoman@example.com',
            'password': 'hashedpassword4',
            'profileImageUrl': 'https://res.cloudinary.com/dt3unm9lt/image/upload/v1735412909/GetFitWit/pfp/hwjo876t5fhif2hqo8xh.jpg',
            'bio': 'Bemoman is here!',
        },
        {
            'username': 'Temo',
            'email': 'temo@example.com',
            'password': 'hashedpassword5',
            'profileImageUrl': 'https://res.cloudinary.com/dt3unm9lt/image/upload/v1735412909/GetFitWit/pfp/ad9z8g7hjnxgklogodpl.jpg',
            'bio': "I'm just Temo!",
        },
        {
            'username': 'Teemo',
            'email': 'teemo@example.com',
            'password': 'hashedpassword6',
            'profileImageUrl': 'https://res.cloudinary.com/dt3unm9lt/image/upload/v1735412909/GetFitWit/pfp/q4l0iow4neqxlzjh23hh.jpg',
            'bio': 'Teemo!',
        },
        {
            'username': 'Gekko',
            'email': 'gekko@example.com',
            'password': 'hashedpassword7',
            'profileImageUrl': 'https://res.cloudinary.com/dt3unm9lt/image/upload/v1735412908/GetFitWit/pfp/lks8sus1yooeaghuey5k.jpg',
            'bio': 'Hey little buddies! Gekko here!',
        },
        {
            'username': 'Geicko',
            'email': 'geicko@example.com',
            'password': 'hashedpassword8',
            'profileImageUrl': 'https://res.cloudinary.com/dt3unm9lt/image/upload/v1735412908/GetFitWit/pfp/ivjztiquvy9stokf6hho.jpg',
            'bio': 'Geicko with me!',
        },
        {
            'username': 'Mr. Universe',
            'email': 'mruniverse@example.com',
            'password': 'hashedpassword9',
            'profileImageUrl': 'https://res.cloudinary.com/dt3unm9lt/image/upload/v1735412908/GetFitWit/pfp/jibdak0pk34va97or3qp.jpg',
            'bio': 'I am your Universe!',
        },
        {
            'username': 'World',
            'email': 'world@example.com',
            'password': 'hashedpassword10',
            'profileImageUrl': 'https://res.cloudinary.com/dt3unm9lt/image/upload/v1735412906/GetFitWit/pfp/lf9hvkudbqwvowd4utiu.jpg',
            'bio': 'I am your World!',
        },
        {
            'username': 'Atlas',
            'email': 'atlas@example.com',
            'password': 'hashedpassword11',
            'profileImageUrl': 'https://res.cloudinary.com/dt3unm9lt/image/upload/v1735412906/GetFitWit/pfp/puducugopbgjgvzyv2uj.jpg',
            'bio': 'I will hold the world up!',
        },
        {
            'username': 'Hercules',
            'email': 'hercules@example.com',
            'password': 'hashedpassword12',
            'profileImageUrl': 'https://res.cloudinary.com/dt3unm9lt/image/upload/v1735412906/GetFitWit/pfp/e0v8987hghwtfb1bc9kz.jpg',
            'bio': 'Hercules! Hercules!',
        },
        {
            'username': 'Juandissimo',
            'email': 'juandissimo@example.com',
            'password': 'hashedpassword13',
            'profileImageUrl': 'https://res.cloudinary.com/dt3unm9lt/image/upload/v1735412906/GetFitWit/pfp/iyjh94vfywimeuhhfbr3.jpg',
            'bio': 'Look at me!',
        },
        {
            'username': 'Goku',
            'email': 'goku@example.com',
            'password': 'hashedpassword14',
            'profileImageUrl': 'https://res.cloudinary.com/dt3unm9lt/image/upload/v1735412906/GetFitWit/pfp/hylphnwr28mvcsirsfv5.jpg',
            'bio': 'Haaaaaaaaa!',
        },
        {
            'username': 'Superman',
            'email': 'superman@example.com',
            'password': 'hashedpassword15',
            'profileImageUrl': 'https://res.cloudinary.com/dt3unm9lt/image/upload/v1735412905/GetFitWit/pfp/r3hk4y4xqilqoktst2mm.jpg',
            'bio': "Krypto",
        },
        {
            'username': 'Batman',
            'email': 'bataman@example.com',
            'password': 'hashedpassword16',
            'profileImageUrl': 'https://res.cloudinary.com/dt3unm9lt/image/upload/v1735412904/GetFitWit/pfp/vvrlqanilykh8vcuswi7.jpg',
            'bio': 'I am Batman!',
        },
        {
            'username': 'Saitama',
            'email': 'saitama@example.com',
            'password': 'hashedpassword17',
            'profileImageUrl': 'https://res.cloudinary.com/dt3unm9lt/image/upload/v1735412904/GetFitWit/pfp/zmddfsoiqdfxzud8ftdy.jpg',
            'bio': 'Serious',
        },
        {
            'username': 'Ares',
            'email': 'ares@example.com',
            'password': 'hashedpassword18',
            'profileImageUrl': 'https://res.cloudinary.com/dt3unm9lt/image/upload/v1735412903/GetFitWit/pfp/jbsv3qmzl4kn9nbgr1v5.jpg',
            'bio': 'WAR!',
        },
        {
            'username': 'Thor',
            'email': 'thor@example.com',
            'password': 'hashedpassword19',
            'profileImageUrl': 'https://res.cloudinary.com/dt3unm9lt/image/upload/v1735412903/GetFitWit/pfp/bqvcn30irnsp3mgh37pl.jpg',
            'bio': 'Thor is here',
        },
        {
            'username': 'Achilles',
            'email': 'achilles@example.com',
            'password': 'hashedpassword20',
            'profileImageUrl': 'https://res.cloudinary.com/dt3unm9lt/image/upload/v1735412903/GetFitWit/pfp/w5rvpd5iwfoa8zvdianb.jpg',
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
