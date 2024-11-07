## Landing page of our application

<http://deployedac.s3-website.us-east-2.amazonaws.com/>

## USE-CASES COMPLETED FOR THIS ITERATION

### Customer Use-cases

1. Search items
2. Sort items
3. View item

### Seller Use-Cases

1. Create Account
2. Close Account
3. Login Account
4. Add Item
5. Remove Inactive Item
6. Review Items
7. Edit Item
8. Publish Item
9. Unpublish Item

## HOW TO NAVIGATE THROUGH THE APPLICATION AND TEST THIS ITERATION'S USE-CASES?

IMPORTANT NOTE: Do NOT refresh/reload the application once there through the link as
that will break the application's functionality.

### Customer Use-Cases

 **View Item**: Once on the landing page, you will always be considered a "Customer" until you log into an account.
The first thing you will see on the application's landing page is a "Welcome" message. After seeing
the message,you will need to click on the "View Items" button at the top left side of the page. After
doing so,you will be able to see all the items that are published (or made "Active") so far on this application.
It should be noted that all of those items were made by users we made to test our application. These items
will contain information such as their name, description, associated pictures, published date and time, their expiration date
and time, their initial price, and their bids if they have any. For this iteration, none of the items will
have bids associated with them. If items have multiple associated pictures, you willbe able to scroll through
them by first hovering over them, and then clicking on the left and right arrows that appear on them.

**Sort Items:**
After you finish "viewing" the items, you will be able to sort the items by either their initial price, their published date
and time, or their expiration date and time simply by clicking on the "Sort by" field and selecting your sort by option, and
selecting whether you want the items sorted in ascending or descending order by clicking on the field that shows either "Ascending"
or "Descending". Of course, both of those sorting options can be changed at any time. If you want to undo the sorting, simply
re-click on the field you used to sort the items by the chosen option and select "Sort By".

**Search Items:**
After finishing to experiment with being able to sort the items, you will be able to use the visible items' search feature
(see the field that says "search by name or description"). The way the visible items' search feature works is that as soon as you type
anything in the associated field, the only visible items that will appear are ones that contain the currently typed string in either
their name or description or both. To undo this, simply completely delete the current string from the field associated with the
visible items' search feature.



### Seller Use-Cases

**Create Account:**
Once you are finished experimenting with the visible items for customers, you can click on the "Create Account" button located
at the top-right corner of the page to be redirected to a page that lets type in a username and password and select the type of
user you are. For this iteration, you will be only be able to create an account as a seller as we have not implemented the "buyer"
functionality yet. If you try to create an account with a username that already exists, you will have to edit your account
until you come up with a username that does not already exists, and capitalization DOES matter here. For testing purposes,
we made accounts with the usernames "Beta", "Special", "Test1", and "Test2". Once you successfully create your account, you will
be redirected back to the Customer's "View Items" page.

**Login Account**
Once back there, click on the "Login" button right on the left of the "Create Account" to be directed to a page that lets you log
into your account. To do so, simply fill in the "Username" and "Password" fields with the credentials you decided to use when
creating your account and click on the big blue "Login" button directly below the "Username" and "Password" fields. If either
your typed username or password is not correct, you will be required to redirect to edit the fields that are typed wrong until
both your typed username and password are correct.

**Close Account**
Once you are logged in, you will be able to see a "Close Account" button at the top-right corner of the page. Click on it to be prompted with a message that asks you if you are sure you want to close your account. If you click on "Yes", you will be redirected back to the Customer's "View Items" page. If you click on "No", you will be redirected back to the page you were on before you clicked on the "Close Account" button.

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
