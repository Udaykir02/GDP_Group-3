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


  ## 6. User Experience (UX):
 
- Regardless of the device or screen size, the app should offer a consistent and user-friendly experience.
  
- Throughout the whole shopping process, from finding products to checking out, consumers should be guided by logical and easy navigation flows.
  
- In order to comply with accessibility standards like WCAG 2.0, accessibility features should be added to the software to guarantee that people with impairments can utilize it.
  

## 7. Compatibility:

- Several Android and iOS devices running various operating systems should be able to use the program.
  
- Compatibility testing should be done to ensure that the application works properly on a range of screen resolutions, aspect ratios, and hardware combinations.


## 8. Usability:
 
- The user interface of the app should have clear, simple-to-understand labeling and instructions, as well as an appealing visual design.
- Feedback methods like error messages and loading indicators should be included to inform users of the app's state and actions.

## 9. Network Resilience:
 
- When feasible, the application should include offline features, such as the ability to cache product data for offline browsing, and should gracefully handle network outages and low bandwidth conditions.
- Progressive loading strategies should be used to give priority to important information and functionality over non-essential ones when a network is slow.

## 12. Backup and Restoration:

- To prevent data loss in the event of hardware failures or system issues, regular backups of the application data, including user profiles, product information, and transaction records, should be carried out.
- Backup schedules and retention policies should be established to guarantee that backup copies are kept for a suitable amount of time and are easily available for restoration reasons.
- Point-in-time recovery techniques must be put into place to enable the program to be restored to a particular state prior to data corruption or unintentional deletions.
- Backup data should be safely kept off-site or in cloud storage services to guard against calamities like fire, theft, or server failures.
- Automated backup and restore procedures should be routinely observed to ensure their efficacy and quickly address any problems or malfunctions.
