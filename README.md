### Landing page of our application:
http://deployedac.s3-website.us-east-2.amazonaws.com/

We've also include the "package.json" file with the 
Dependencies to install in case there are any issues 
with the link and you decide to try running our code
locally.

USE-CASES COMPLETED FOR THIS ITERATION:
Customer Use-cases:
Search items
Sort items
View item

Seller Use-Cases:
Create Account
Close Account
Login Account
Add Item
Remove Inactive Item
Review Items
Edit Item
Publish Item
Unpublish Item

HOW TO NAVIGATE THROUGH THE APPLICATION AND TEST THIS ITERATION'S USE-CASES?
IMPORTANT NOTE: Do NOT refresh/reload the application once there through the link as
that will break the application's functionality.

Customer Use-Cases:
View Item:
Once on the landing page, you will always be considered a "Customer" until you log into an account. 
The first thing you will see on the application's landing page is a "Welcome" message. After seeing 
the message, you will need to click on the "View Items" button at the top left side of the page on the navbar. After 
doing so, you will be able to see all the items that are published (or made "Active") so far on this application.
It should be noted that all of the existing items that are visible were made by users we made to test our application. The items that appear 
will contain information such as their name, description, associated pictures, published date and time, their expiration date 
and time, their initial price, and their bids if they have any. The information related to each item are displayed as rectangular cards laid out in a grid format. For this iteration, none of the items will 
have bids associated with them. If items have multiple associated pictures, you will be able to scroll through 
them by first hovering your mouse over the item's card near the left or right edges of the image, and then clicking on the left and right arrows that appear on them when hovering your mouse over the pictures.

Sort Items:
While you are "viewing" the items, you will be able to sort the items by either their initial price, their published date
and time, or their expiration date and time simply by clicking on the "Sort by" field and selecting your sort by option, and 
selecting whether you want the items sorted in ascending or descending order by clicking on the field that shows either "Ascending" 
or "Descending". Upon selecting the desired filter options, the items are automatically sorted without the need to press any additional buttons. Of course, both of those sorting options can be changed at any time. If you want to undo the sorting, simply 
re-click on the field you used to sort the items by the chosen option and select "Sort By".

Search Items:
After finishing experimenting with being able to sort items, you will be able to use the search bar that is visible on the top left hand side of the page (see the field that has the placeholder text "search by name or description"). The way the visible items' search feature works is that as soon as you type
anything in the search bar, the only visible items that will appear ones that contain the currently typed string in either 
their name or description or both. To undo this, simply completely delete the current string from the field associated with the 
visible items' search feature. Just as a note, the visible items’ search feature will still work even if sorting has been applied.

Seller Use-Cases:
Create Account:
Once you are finished experimenting with the visible items for customers, you can click on the "Create Account" button located 
at the top-right corner of the page to be redirected to a page that lets you type in a username and password and select the type of
user you are (either "Seller" or "Buyer"). For this iteration, you will be only be able to create an account as a seller as we have not implemented the "buyer"
functionality yet. If you try to create an account with a username that already exists, an error message will become visible at the top of the page that states that "Account creation failed: Username already exists." You will have to try new potential usernames
until you come up with a username that does not already exist. The username and password are case sensitive. For testing purposes, 
we made accounts with the usernames "Beta", "Special", "Test1", “Test15”, "Test16", and "Test2" so avoid these usernames when trying to create a new account. Once you successfully create your account, you will see a message that says "Account created successfully!", indicating your account has successfully been created.

Login Account:
Once you successfully create your account, click on the "Login" button right on the left of the "Create Account" button at the top right hand side on the navbar to be directed to a page that lets you log
into your account. To do so, simply fill in the "Username" and "Password" fields with the credentials you decided to use when 
creating your account and click on the big blue "Login" button directly below the "Username" and "Password" fields. If either 
your typed username or password is not correct, you will be shown a message stating, "Invalid username or password." You will be required to edit the fields that are typed wrong until 
both your typed username and password are correct. As mentioned before, for this iteration, it is assumed that you will always log in as a seller.

Add Item:
Now that you have logged in as a customer, you will always be treated as one until you log out or decide to close your account. Because of this, the “View Items” button on the top left of the screen will be replaced by the buttons “Add Item” and “Review” items for this iteration, and on the top-right side of the screen, the “Login” and “Create Account” buttons will be replaced by “Logout” and “Close Account” buttons upon successfully logging in as a seller. Upon logging in, you will be brought back to the home page which has the message, "Welcome {your-username}." From here, you can click the "Add Item" button on the top left hand side of the screen, which will take you to the "Add Item" page where you will be able to add a new item. On the page, you will be greeted by the heading, "Add A New Item Here" and some instructions asking to "Please fill out all of the fields in order to add this item." The page also contains text fields labeled "Item Name", "Initial Price", and "Item Description" where you should enter the name of the item, a description of the item, and an initial price of the item respectively. Please note that the "Initial Price" field will not accept any non-whole number value under $1. There is a date and time picker labeled "Bid End Date" where you should enter a tentative date for bidding to end on the item that you are adding. Lastly, there is a file uploader field with the label "Item Image(s)" where you can add images for your item. You need to add at least 1 field before being able to press the "Add Item" button and may add as many images as needed for that item. Please note that you cannot upload the same image twice in a row due to the nature of how uploaded images are registered. It is also worth mentioning that while multiple images can be uploaded for items, you will only see the information regarding the latest image you uploaded next to the “choose files” button used to upload your item images. After completing all of the fields, click the "Add Item" button which will add your item and redirect you to the Review Items Page upon successful addition.  

Review Items:
Note that due to use-case dependencies, the functionality for the use-cases “Remove Inactive Item”, “Edit Item”, “Publish Item”, “Unpublish Item” are all covered within the “Review Items” navigation instructions.

Now that you are on the Review Items Page, you will be able to see all of your items that you have previously added including the item that you just added from the Add Item page. The items will be shown as rectangular card components laid out in a grid format. Each card displays the item's ID and the item's name. On this page, you will also see a dropdown with the placeholder text "Choose a Filter". Click on the dropdown to view all of the potential options for the activity status of an item which you can filter the items by. As soon as you select an option, you will only see items of the selected activity status. Note that due to the functionality implemented for this iteration, it is only possible for an item to have a status of “Inactive” and “Active”. If you would like to see more information about a particular item, click on the card for that particular item, and you will be taken to the Review Specific Item page for that selected item. On this page, you will be able to see all of the information for the selected item. The information that you will be able to see consists of the Item ID, Item Name, the item images, Item Description, Initial Price, Bid Start Date, Bid End Date, and the Published Date of the item which will be empty if the item has never been previously published. You can view multiple images by clicking on the left and right arrow buttons on the image carousel or picking the image that you want to see from the available ones shown below the currently viewing image. If the item's activity status is "Inactive" (synonymous to "unpublished"), you will see three buttons with texts "Remove Item", "Publish Item", and "Edit Details". Note that as the “Archive Items” use-case has not been implemented yet, there is no button that appears when you click on an item even if that item is “Inactive”.

Remove Inactive Item:
If you would like to remove an inactive item, you can click on the button with the label text "Remove Item" which will remove the item from your account and redirect you to the Review Items Page where you will be able to see that you no longer have the item that you just deleted. 

Publish Item:
If the item has an activity status of "Inactive", you will be able to see the "Publish Item" button, which you will otherwise not be able to see if the item had an activity status of "Active." When you click on the "Publish Item" button, you will see the "Remove Item" and "Edit Details" buttons disappear. The Bid Start Date and Published Date fields are populated with the current date and time. You will also see a new section with the text "No bids have been placed yet". Please note the following. Firstly, you will only be able to publish an item if the date and time that you selected for its BidEndDate is later than today's current date and time when adding it. If you still wish to publish that item, then you will have to edit it first to make its BidEndDate later than today's current date and time. Secondly, for this iteration, bids cannot be placed or viewed as those use cases are not part of this iteration. To test that the item has been published, you can go back to the Review Items Page and select "Active" for the activity status filter, and the item should be visible. Additionally, you can also logout. Doing so will once again cause the application to treat you as a customer and will redirect you to the “View Items" page, where you will be able to see the item that was just recently published. After you are done checking this, you may log back in as a seller using the same credentials you used to create your account.

Unpublish Item:
If the item has an activity status of "Active", you will only be able to see the "Unpublish Item" button. This button will only be visible and available for you to click if there are no bids placed on the item yet. No items in this iteration will have any bids on them as those use cases are not part of this iteration. If you click on the "Unpublish Item" button, the item's activity status will be changed back to "Inactive". In order to test this, you can go back to the Review Items page and select the "inactive" option under the activity status filter dropdown. 

Edit Item:
If you want to edit the details of an "Inactive" item, you can do so by clicking the "Edit Details" button that appears when you click on an “Inactive” item visible on the “Review Items” page. Note that you can only edit details of an "Inactive" item. Upon clicking the "Edit Details" button, you will be brought to a page very similar to the Add Item page with the fields populated with the information that is currently stored for that item. Upon changing the desired information, you can click the "Save Edits" button in order to save your changes. You will be redirected to the Review Items page upon the edits being successfully saved. Now, once again, for the same reasons mentioned under the “Add Item” use-case, you will NOT be able to add the same picture twice in a row for the item that you are editing.

Close Account:
If for whatever reason, you decide that you no longer need your account and would like to close it, you can click on the "Close Account" button on the top right hand side of the navbar. You will receive a confirmation alert that asks "Are you sure you want to close your account? This action cannot be undone." You can press "OK" if you are sure that you want to close your account. If you try to close your account and you currently have "Active" auction items on your account, you will be shown another alert with the message "Cannot close account with active auctions" and your account will be prevented from being closed. However, if your account does not have any "Active" items, then your account will be closed, you will be shown an alert with the message "Account closed successfully!", you will be logged out, and redirected to the view items page and be treated as a customer once again. If you try to log back in with the credentials of any “Closed” account, instead of being logged in, you will be shown the error message that says "Account is closed and cannot be logged in".



## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

* [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
* [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
