# My Celebrity Horoscope
A lightweight app that helps you live your life like your celebrity look-a-like!


## Functionality
Our app idea is simple - everyone is obsessed with celebrities, and most everyone is interested in astrology and horoscopes. Combining these together seems like a natural fit! A user can submit a photo, which we then match to their celebrity look-a-like. That being done, we also today's horoscope to the user, the catch being that it is the horoscope for their celebrity look-a-like, rather than for themself.

## How It Works
We built a simple web interface where a user can submit their photo. The photo is sent via AJAX to a face-recognition API, where it is compared to a collection of celebrities that we generated. Then, from a second database we retrieve stored information about the celebrity. Among this information is their astrological sign, which we use to make a second AJAX call to an astrology API. The user match is stored to our database, and then the information is then displayed to the user via jQuery. 

## Technologies we used
### [Face++](https://www.faceplusplus.com/)
A robust Facial- and Body-recognition API that forms the backbone of our app. We use this both as part of our celebrity database, as well as for doing the actual user vs. celebrity face comparison.

### [Aztro](https://aztro.readthedocs.io/en/latest/)
A simple, easy-to-use API that allows us to quickly grab daily horoscopes for a given astrological sign.

### [Firebase](https://firebase.google.com/)
A platform that provides authentication, databasing, and blob storage. We utilized this in nearly all facets of our app. The high-speed Realtime Database was perfect for the rapid data storage and retrieval that we needed to do, and the auth and storage helped us round out our app as well.

## Future Development Plans
### Celebrity Database Automation
We currently gather celebrity photos, names and signs manually. In order to truly scale our celebrity database, we will need to implement some automation for this process. Ultimately, we will be able to input a list of celebrity names, and then our app finds an appropriate image and the correct zodiac sign for each.

### Local Storage and Image Standardization
Our image database largely uses third-party-hosted images, most of which are copyrighted. We will need to move to storing images ourselves and pruning the copyrighted images, replacing them with royalty-free equivalents. Additionally, we will add some image format standardization, so that images are of appropriate size and quality before being added to the collection.

### Social Media Integration
Users should be able to link their social media accounts to our app. This would streamline the user experience, both in terms of photo submission, as well as sharing their celebrity match with their friends.


## Contributors
- [Nate Becker](https://github.com/natebecker11)
- [Kristian Neely](https://github.com/kneely13)
- [Alex Perry](https://github.com/Prerry2)
- [Mark Piscioneri](https://github.com/MarkPish)
