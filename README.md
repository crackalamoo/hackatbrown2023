## Inspiration

**According to a study published by the IEEE in 2010 the average image reCAPTCHA takes 10 seconds, while the average audio reCAPTCHA takes 30 seconds**

As AI capabilities improve rapidly in today's world, cybersecurity experts have constantly been challenged by intelligent bots that can spam websites with thousands of requests each minute. To combat this issue, researches developed tools like reCAPTCHA to prevent bot traffic on websites. Today's reCAPTHAs have become frustrating and disruptive to the user-experience (Have you ever been confused if there is a traffic light in the square?). bioCAPTCHA aims to provide a user-friendly way to prevent malicious bot traffic using the webcam to take a selfie that is sent to a face-detection software.

**In contrast, the average bioCAPTCHA takes about 5 seconds to verify!**

This project was designed with accessbility in mind - reCAPTCHA is currently difficult to use for the visually impaired, the elderly, colorblind people, and children. Prompts can be read with a screen reader and are simple (e.g. smile!)

With one simple click, bioCAPTCHA can verify that a human is using the website, making it easy for developers to leverage bioCAPTCHA.

bioCAPTCHA aims to protect communities from malicious bot activities, keeping everyone safe while exploring the world wide web.

## What it does

bioCAPTCHA comes as a React component that can be embedded into other websites. When prompted, the user's webcam activates and a photo is taken. Three photos are taken in quick succession to increase the sample size of the data. The three photos are then sent to a Flask backend that uses OpenCV to search for faces in the image. If a face is found, then the user is allowed to pass to the next page of the website and display protected content. Otherwise, the test fails and the user is stopped.

One security features we implemented was making sure that only specified websites can send requests to the backend. A second security feature we implemented was caching images on the backend server. This allows us to check if incoming images are duplicates of images that the backend has already seen, which would indicate bot traffic. A third security feature was requesting the user to smile to reduce the number of possible images a bot could send through the bioCAPTCHA.

\*NOTE: The error messages shown in the "hacker's" attempts to circumvent bioCAPTCHA are real security issues. The messages were printed from the console, then put on the website in green text for visual effect.

## How we built it

The frontend was built in React. The backend was built using Python, Flask, and OpenCV.

## Challenges we ran into

One challenge we ran into was potential attacks from hackers sending pre-saved images instead of using the webcam. We solved this by checking the origins of requests to ensure they came from verified web domains.

A second challenge was protecting the backend from a bot sending duplicate requests. We solved this challenge by caching images on the server and checking incoming images against them.

A final challenge was connecting the frontend and backend. We ran into multiple issues with communication and matching complex datatypes throughout the project.

## Accomplishments that we're proud of

1. We were able to complete a working product.
2. Our project was able to meet our intended goal (Using faces to verify that a human is using a website).
3. We are most proud of not giving up. Originally, the project was intimidating and brought many challenges. However, we stayed with it and were eventually able to build a working demo.

## What we learned

We learned a lot about network security and using OpenCV with a flask backend. These new technologies made it a lot easier to build effective programs.

## What's next for bioCAPTCHA

1. Using fingerprint data
2. Using images instead of three still images
3. Asking the user to match hand gestures (1 finger on left hand etc.)
4. Using digital signatures to ensure data is coming from a verified source (Webcam, fingerprint reader, etc.)
