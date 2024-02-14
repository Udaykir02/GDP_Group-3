# Non-Functional Requirements for Storegrab

## 1. Performance:

- Both iOS and Android devices must have fluid and responsive user interfaces offered by the program.
- Product listings, image loading times, and checkout procedures should all be optimized for speedy access while taking possible network variations into account.
- Even during periods of high traffic, the app should be able to manage many user interactions with efficiency and maintain acceptable response times.

## 2. Security:

- Sensitive data, including payment information and personal information, must be transmitted and authenticated by users using encryption to protect its integrity.
- Protecting user credentials and other sensitive data kept locally on the device requires the implementation of secure storage techniques.
- In order to defend against typical security risks like SQL injection, cross-site scripting (XSS), and cross-site request forgery (CSRF), the app should follow recommended procedures.

## 3. Stability:

- On both the Android and iOS operating systems, the program must be reliable, devoid of frequent crashes or strange behavior.
- In particular, on devices with restricted hardware capabilities, memory management and resource consumption should be optimized to prevent performance degradation over time.

## 4. Availability:

- Users must always be able to use the app, even during brief maintenance or update windows.
- To guarantee ongoing availability even in the case of server failures or network disruptions, redundant server infrastructure and failover procedures should be in place.


##  5. Scalability
 
- The application architecture should be planned to handle future increases in the number of users and the size of the product catalog.

- With the option to add more server instances or cloud resources as needed, horizontal scaling should be provided to accommodate rising concurrent user activity.

- To expand specific components, like databases and application servers, to effectively handle increased traffic, vertical scaling methods need to be in place.

- To prevent performance bottlenecks and spread incoming traffic evenly across several server instances, load balancing solutions should be put into practice.
