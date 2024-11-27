# Auction House Application

### Landing Page
[Visit the application](http://deployedac.s3-website.us-east-2.amazonaws.com/)

---

## Use-Cases Completed for This Iteration

### Customer Use-Cases:
- Search items
- Sort items
- View item

### Seller Use-Cases:
- Create Account
- Close Account
- Login Account
- Add Item
- Remove Inactive Item
- Review Items
- Edit Item
- Publish Item
- Unpublish Item

---

## How to Navigate Through the Application and Test This Iteration's Use-Cases

**IMPORTANT NOTE:** Do NOT refresh/reload the application once there through the link as that will break the application's functionality.

### Customer Use-Cases:

#### View Item:
1. On the landing page, you are considered a "Customer" until you log into an account.
2. Click on the "View Items" button on the top left side of the navbar.
3. You will see all the published items displayed as rectangular cards in a grid format.
4. Each item card contains information such as name, description, images, published date, expiration date, initial price, and bids (if any).

#### Sort Items:
1. While viewing items, you can sort them by initial price, published date, or expiration date.
2. Use the "Sort by" dropdown and select your sorting option.
3. Choose between "Ascending" or "Descending" order.
4. Items are automatically sorted without needing additional buttons.

#### Search Items:
1. Use the search bar on the top left side of the page (placeholder: "search by name or description").
2. As you type, only items containing the typed string in their name or description will appear.
3. To undo the search, clear the search bar.

### Seller Use-Cases:

#### Create Account:
1. Click on the "Create Account" button at the top-right corner of the page.
2. Fill in the username, password, and select "Seller" as the user type.
3. Avoid using usernames: "Beta", "Special", "Test1", "Test15", "Test16", and "Test2".
4. Upon successful account creation, you will see a message: "Account created successfully!".

#### Login Account:
1. Click on the "Login" button next to the "Create Account" button.
2. Enter your username and password.
3. Click the "Login" button.
4. If credentials are incorrect, you will see: "Invalid username or password.".

#### Add Item:
1. After logging in, click the "Add Item" button on the top left side of the screen.
2. Fill in the fields: "Item Name", "Initial Price", "Item Description", "Bid End Date", and upload images.
3. Click the "Add Item" button to add your item and redirect to the Review Items Page.

#### Review Items:
1. On the Review Items Page, you will see all your added items.
2. Use the dropdown to filter items by activity status.
3. Click on an item card to view more details on the Review Specific Item page.

#### Remove Inactive Item:
1. Click the "Remove Item" button on an inactive item to delete it.

#### Publish Item:
1. Click the "Publish Item" button on an inactive item to make it active.
2. Ensure the BidEndDate is later than the current date and time.

#### Unpublish Item:
1. Click the "Unpublish Item" button on an active item to make it inactive.
2. This button is only available if there are no bids on the item.

#### Edit Item:
1. Click the "Edit Details" button on an inactive item to edit its details.
2. Update the fields and click "Save Edits".

#### Close Account:
1. Click the "Close Account" button on the top right side of the navbar.
2. Confirm the action in the alert.
3. If you have active items, you will see: "Cannot close account with active auctions".
4. If successful, you will see: "Account closed successfully!".

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