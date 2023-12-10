<h1 align="center">
🌐 Virtual Farm Market
</h1>
<p align="center">
MongoDB, Expressjs, React/Redux, Nodejs
</p>



MERN stack is the idea of using Javascript/Node for full-stack web development.

## clone or download
```terminal
$ git clone https://github.com/vinit-modi/Virtual-Farm-Market.git
$ yarn # or npm i
```

## project structure
```terminal
LICENSE
package.json
server/
   package.json
   
client/
   Virtual-Farm-Market/
      package.json
...
```

# Usage (run full-stack app on your machine)

## Prerequisites
- [MongoDB](https://gist.github.com/nrollr/9f523ae17ecdbb50311980503409aeb3)
- [Node](https://nodejs.org/en/download/) ^10.0.0
- [npm](https://nodejs.org/en/download/package-manager/)

notice, you need the client and server runs concurrently in a different terminal session, to make them talk to each other

## Client-side usage(PORT: 3000)
```terminal
$ cd client          // go to client folder
$ yarn # or npm i    // npm install packages
$ npm run dev        // run it locally

// deployment for client app
$ npm run build // This will compile the react code using Webpack and generate a folder called docs in the root level
$ npm run start // This will run the files in docs, this behavior is the same as how gh-pages will run your static site
```

## Server-side usage(PORT: 3000)

run the script at the first level:

```terminal
// in the root level
$ cd server
```

### Start

```terminal
$ cd server   // go to server folder
$ npm i       // npm install packages
$ npm start
```
# Virtual-Farm-Market

"Virtual Farm Market" is a web-based project built on the MERN stack. Our Web App will connect farmers and customers, simplifying ordering fresh produce. Farmers can register on our platform to sell their products, while customers can directly purchase vegetables from local farms. Our platform incorporates a geolocation-based search feature, enabling customers to identify and connect with nearby farmers quickly. We also offer a self-pickup service, allowing customers to schedule the collection of their orders.

At its core, "Virtual Farm Market" leverages technology to address the challenge of obtaining fresh produce daily. By eliminating intermediaries and connecting farmers directly with customers, the project not only simplifies the procurement process but also promotes the support of local agriculture. The platform's user-friendly interface and geolocation features ensure a seamless experience for farmers and customers, enhancing the accessibility of fresh produce.

By fostering direct connections between farmers and consumers, "Virtual Farm Market" seeks to contribute to the growth of local farming communities. Through its technology-driven approach, this project offers a solution to a fundamental problem many families face—access to fresh, locally sourced vegetables. It promotes sustainability and strengthens the bond between consumers and the agricultural producers in their community.

Technology Description
For our project, we've decided to use the MERN (MongoDB, Express, React, Node.js) stack because of its outstanding features and widespread industry acceptance. MongoDB's NoSQL database offers scalability and flexibility, and Express.js makes server-side programming easier. React.js provides a dynamic and responsive user interface renowned for its component-based architecture. Our runtime environment, Node.js, guarantees effective server-side operations. We can embrace iterative development and seamless collaboration by combining these technologies with Agile methodology. This enables us to react to changing needs and build a solid, full-stack web application that aligns with contemporary software development practices. The MERN stack is an excellent option for our project because of this.

Below are visual representations of key sections and functionalities within the system:

## User Dashboard

![User Dashboard](./screenShorts/UserDashboard.png)
The central hub for users, offering an overview of their account activities, orders, and personalized settings.

## Stripe Payment Gateway Integration

![Stripe Payment Gateway](./screenShorts/StripePaymentGateway.png)
Seamless integration of the Stripe payment gateway for secure and efficient transactions.

## Login Page

![Login Page](./screenShorts/LoginPage.png)
User authentication portal ensuring secure access to accounts.

## Email Confirmation and Confirmation Mail

![Email Confirmation](./screenShorts/EmailConfirmation.png)
![Confirmation Mail](./screenShorts/EmailConfirmationMail.png)
Email verification process to confirm user identity and account activation.

## Admin CMS (Content Management System)

![Admin CMS](./screenShorts/AdminCMS.png)
Backend interface allowing administrators to manage content and website functionalities.

## Admin FAQs Management

![Admin FAQs](./screenShorts/AdminFAQs.png)
![Admin FAQs Update](./screenShorts/AdminFAQsUpdate.png)
Management and updating of Frequently Asked Questions (FAQs) to assist users effectively.

## Admin Categories Management

![Admin Categories](./screenShorts/AdminCategories.png)
Control panel for administrators to oversee and manage various product categories.

## Farmer-Side Order Status Update

![Farmer Order Update](./screenShorts/FarmerSideOrder-UpdateStatus.png)
Empowers farmers to update order statuses for efficient order management.

## Farmer Product Addition

![Farmer Add Product](./screenShorts/FarmerAddProduct.png)
Interface for farmers to add their products to the platform for sale.

## User Settings and Notifications

![User Settings](./screenShorts/UserSettings.png)
![User Notifications](./screenShorts/UserNotifications.png)
User-specific settings and notifications management for a personalized experience.

## User Order Management

![User Order List](./screenShorts/UserOrderList.png)
Detailed list of user orders, providing order history and status updates.

## Order Confirmation and Successful Checkout

![Order Successful](./screenShorts/OrderSuccessful.png)
![Proceed to Checkout](./screenShorts/UserProccedToCheckout.png)
Visual confirmation of successful order placement and the checkout process.

## User Address and Payment Details Addition

![User Add Address Form](./screenShorts/UserAddAddressForm.png)
![Add Payment Card](./screenShorts/AddPaymentCard.png)
User interfaces allowing the addition of address details and payment methods for smoother transactions.

## User Cart Management

![User Cart List](./screenShorts/UserCartList.png)
![User Selected Product](./screenShorts/UserSelectedProduct.png)
View of the user's cart and selected products for purchase.

## Admin User Management

![Admin User List](./screenShorts/AdminUserList.png)
Admin dashboard for managing users and their respective roles within the system.
