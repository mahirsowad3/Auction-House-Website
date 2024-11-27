# Auction House Application

### Landing Page

[Visit the application](http://deployedac.s3-website.us-east-2.amazonaws.com/)

---

## Use-Cases Completed for This Iteration

### Customer Use-Cases

- Search items
- Sort items
- View item

### Seller Use-Cases

- Create Account
- Close Account
- Login Account
- Add Item
- Remove Inactive Item
- Review Items
- Edit Item
- Publish Item
- Unpublish Item

### Buyer Use-Cases

- Create Account
- Close Account
- Login Account
- See Your Fund
- Add Funds
- View Items
- Place Bid

---

## How to Navigate Through the Application and Test This Iteration's Use-Cases

**IMPORTANT NOTE:** Do NOT refresh/reload the application once there through the link as that will break the application's functionality.

### Customer Use-Cases

#### View Item

1. On the landing page, you are considered a "Customer" until you log into an account.
2. Click on the "View Items" button on the top left side of the navbar.
3. You will see all the published items displayed as rectangular cards in a grid format.
4. Each item card contains information such as name, description, images, published date, expiration date, initial price, and bids (if any).

#### Sort Items

1. While viewing items, you can sort them by initial price, published date, or expiration date.
2. Use the "Sort by" dropdown and select your sorting option.
3. Choose between "Ascending" or "Descending" order.
4. Items are automatically sorted without needing additional buttons.

#### Search Items

1. Use the search bar on the top left side of the page (placeholder: "search by name or description").
2. As you type, only items containing the typed string in their name or description will appear.
3. To undo the search, clear the search bar.

### Seller Use-Cases

#### Create Account

1. Click on the "Create Account" button at the top-right corner of the page.
2. Fill in the username, password, and select "Seller" as the user type.
3. Avoid using usernames: "Beta", "Special", "Test1", "Test15", "Test16", and "Test2".
4. Upon successful account creation, you will see a message: "Account created successfully!".

#### Login Account

1. Click on the "Login" button next to the "Create Account" button.
2. Enter your username and password.
3. Click the "Login" button.
4. If credentials are incorrect, you will see: "Invalid username or password.".

#### Add Item

1. After logging in, click the "Add Item" button on the top left side of the screen.
2. Fill in the fields: "Item Name", "Initial Price", "Item Description", "Bid End Date", and upload images.
3. Click the "Add Item" button to add your item and redirect to the Review Items Page.

#### Review Items

1. On the Review Items Page, you will see all your added items.
2. Use the dropdown to filter items by activity status.
3. Click on an item card to view more details on the Review Specific Item page.

#### Remove Inactive Item

1. Click the "Remove Item" button on an inactive item to delete it.

#### Publish Item

1. Click the "Publish Item" button on an inactive item to make it active.
2. Ensure the BidEndDate is later than the current date and time.

#### Unpublish Item

1. Click the "Unpublish Item" button on an active item to make it inactive.
2. This button is only available if there are no bids on the item.

#### Edit Item

1. Click the "Edit Details" button on an inactive item to edit its details.
2. Update the fields and click "Save Edits".

#### Close Account

1. Click the "Close Account" button on the top right side of the navbar.
2. Confirm the action in the alert.
3. If you have active items, you will see: "Cannot close account with active auctions".
4. If successful, you will see: "Account closed successfully!".

### Buyer Use-Cases

#### Create Account

1. Click on the "Create Account" button at the top-right corner of the page.
2. Fill in the username, password, and select "Buyer" as the user type.
3. Avoid using usernames: "Buyer1", "Buyer2".
4. Upon successful account creation, you will see a message: "Account created successfully!".

#### Login Account

1. Click on the "Login" button next to the "Create Account" button.
2. Enter your username and password.
3. Click the "Login" button.
4. If credentials are incorrect, you will see: "Invalid username or password.".

#### See Your Fund

1. After logging in, click the "See Your Funds" button on the top right-side the screen.
2. Your fund balance will be displayed as a pop-up message, e.g., "Your funds: $...".
3. Click the "OK" button to close the message.

#### Add Funds

1. After logging in, click the "Add Funds" button on the top-left side of the screen.
2. You will be redirected to the Add Funds page.
3. On this page, your current balance will be displayed as: "Current Balance: $...".
4. Enter the amount you want to add in the "Enter amount to add" box and click the "Add Funds" button to update your balance.
5. The "Funds added successfully!" message will be shown.
6. The updated balance will be shown as "Current Balance: $...". You can also click the "See Your Funds" button in the navbar to view the updated balance.
7. Make sure the entered value is an integer; decimal values are not allowed.

#### Close Account

1. Click the "Close Account" button on the top right side of the navbar.
2. Confirm the action in the alert.
3. If you have active bids, you will see: "Cannot close account with active auctions".
4. If successful, you will see: "Account closed successfully!".

#### View Item
1. Buyer can view all the active items by clicking on "View Items" on the top left side of the navbar.
2. Buyer can see different details of the item like name, description, images, published date, expiration date, initial price, and bids (if any).
3. Buyer can click on the "View Details" for each item to view more details of that.
4. Buyer can see the all details of the item like name, description, images, published date, expiration date, initial price, and bids (if any).
5. Buyer can see the bid history of the item.
6. Buyer can see the highest bid on the item.
7. Buyer can see the time remaining for the bid to end.

#### Place bid
1. Buyer can place a bid on the item.
2. To place a custom bid, enter the desired amount and click the "Place Custom Entered Bid" button.
3. To place the next higher bid (by $1), simply click the "Place Next Highest Bid (The Item's Current Highest Bid + $1)" button.



---

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
