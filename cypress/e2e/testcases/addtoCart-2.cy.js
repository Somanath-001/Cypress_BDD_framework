import tabs from "../support/tabs";
describe("add the products to cart", () => {
  let data1;
  let data2;
  let productData;
  beforeEach(() => {
    cy.fixture("productData.json").then((Data) => {
      productData = Data;
    });
    cy.visit("http://localhost/avactis/");
  });
  it("Add the products into cart", () => {
    //go to home screen
    tabs.apparel().click();
    // Try to add one t-shirt into the cart
    cy.get("#ProductForm_47").click();
    cy.get('input[value="Add To Cart"]').click();
    cy.get(".ajax_message_box_text").should(
      "includes.text",
      "Product was added to your cart"
    );
    // Try to add one computer product into the cart
    cy.get(".dropdown-toggle").contains("Computers").trigger("mouseover");
    // The dropdown is not visible for Cypress, so we are using 'force: true' to click on the dropdown element
    cy.get(".dropdown-menu").contains("Notebooks").click({ force: true });
    cy.get("#ProductForm_11 > .product_buttons > .btn").click();
    cy.get(".ajax_message_box_text").should(
      "includes.text",
      "Product was added to your cart"
    );
    //Try to add one furniture product into the cart
    tabs.furniture().click();
    cy.get("#ProductForm_169 > .product_buttons > .btn").click();
    cy.get(".ajax_message_box_text").should(
      "includes.text",
      "Product was added to your cart"
    );
    // Verify the cart contains the items you were supposed to add to cart3
    cy.contains("a", "My cart").click();
    cy.get(
      ":nth-child(2) > .product_quantity_selector > .product-quantity > .form-control"
    ).select(productData.qty);
    cy.get(
      ":nth-child(3) > .product_quantity_selector > .product-quantity > .form-control"
    ).select(productData.qty, { force: true });
    cy.get(
      ":nth-child(4) > .product_quantity_selector > .product-quantity > .form-control"
    ).select(productData.qty, { force: true });
    cy.get(".goods-page-description").its("length").should("eq", 4);
    cy.contains("a", "Checkout").click();
    cy.then(() => {
      cy.get('input[name="billingInfo[Email]"]').should(
        "have.value",
        data1.email
      );
      cy.get('input[name="shippingInfo[Email]"]').should(
        "have.value",
        data1.email
      );
    });
    cy.then(() => {
      cy.get('input[name="billingInfo[Postcode]"]').should(
        "have.value",
        data1.zipCode
      );
      cy.get('input[name="shippingInfo[Postcode]"]').should(
        "have.value",
        data1.zipCode
      );
      //
      cy.get("#checkout_1 > .checkout_buttons > .btn-primary").click();
      cy.get(":nth-child(2) > .shipping_method_name > label").click();
      cy.get("#checkout_2 > .checkout_buttons > .btn-primary").click();
      const safeParseFloat = (price) => {
        if (price && typeof price === "string") {
          // Remove non-numeric characters (like commas and dollar signs)
          const cleanedPrice = price.replace(/[^\d.]/g, "");
          return parseFloat(cleanedPrice);
        }
        return 0;
      };
      // Calculate the total price for each product
      const t_shirtTotal = safeParseFloat(productData.price) * productData.qty;

      const laptopTotal =
        safeParseFloat(productData.laptop_price) * productData.qty;
      const chairTotal =
        safeParseFloat(productData.chair_price) * productData.qty;

      // Calculate the subtotal by summing the total prices
      const subtotal = t_shirtTotal + laptopTotal + chairTotal;
      const formattedSubtotal =
        "$" + subtotal.toLocaleString("en-US", { minimumFractionDigits: 2 });

      // Log the subtotal
      cy.log(`T-Shirt Total: $${t_shirtTotal.toFixed(2)}`);
      cy.log(`Laptop Total: $${laptopTotal.toFixed(2)}`);
      cy.log(`Chair Total: $${chairTotal.toFixed(2)}`);
      cy.log("Subtotal: " + subtotal.toFixed(2));

      cy.get(":nth-child(1) > .price").should("have.text", formattedSubtotal);

      // Calculate and verify the Total Amount of products including shipping
      const Total = subtotal + safeParseFloat(productData.shipping_price);
      const orderTotal =
        "$" + Total.toLocaleString("en-US", { minimumFractionDigits: 2 });

      // Log the OrderTotal
      cy.log("Order Total: " + Total.toFixed(2));
      cy.get(":nth-child(3) > .price").should("have.text", orderTotal);
      // Place the order
      cy.get('input[value = "Place Order"]').click();
      cy.get("h1").should("have.text", "Thank you for your order!");
      // cy.get(".note").should("include.text", productData.succsess_Msg);
      // Verify first product name quantity price and Total price

      // Verify first product name
      cy.get(":nth-child(2) > .product_data > .product_name").should(
        "contain.text",
        productData.t_shirt
      );
      // Verify first Product qty
      cy.get(":nth-child(2) > .product_quantity_selector").should(
        "have.text",
        productData.qty
      );
      // verify first product price
      cy.get(":nth-child(2) > .product_sale_price > .value").should(
        "have.text",
        productData.price
      );
      // verfiy first product total price
      // / Extract the parts before and after where the comma should go
      // let beforeComma = `${t_shirtTotal}`.slice(0, -3);
      // let afterComma = `${t_shirtTotal}`.slice(-3);
      // // Combine the parts with a comma and add the decimal point
      // let formattedAmount =
      //   "$" + beforeComma + afterComma.slice(0, 2) + afterComma.slice(2);
      cy.get(":nth-child(2) > .product_total_price > .value").should(
        "have.text",
        `$${t_shirtTotal}`
      );
      // Verify second product name quantity price and Total price

      // Verify second product name
      cy.get(":nth-child(3) > .product_data > .product_name").should(
        "contain.text",
        productData.laptop
      );

      //verify second product qty
      cy.get(":nth-child(3) > .product_quantity_selector").should(
        "have.text",
        productData.qty
      );

      // verfiy second product price

      cy.get(":nth-child(3) > .product_sale_price > .value").should(
        "have.text",
        productData.laptop_price
      );

      // Verify second Product total price
      let num = parseInt(`${laptopTotal}`.replace("$", ""), 10);
      // Format the number with commas and fixed decimal places
      let formattedNumber =
        "$" +
        num.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
      // Return the formatted amount with the dollar signreturn"$" + formattedNumber;

      cy.get(":nth-child(3) > .product_total_price > .value").should(
        "have.text",
        formattedNumber
      );
      // Verify Third product name quantity price and Total price

      // Verify Third product name
      cy.get(":nth-child(4) > .product_data > .product_name").should(
        "contain.text",
        productData.chair
      );

      // Verify Third product qty
      cy.get(":nth-child(4) > .product_quantity_selector").should(
        "have.text",
        productData.qty
      );

      // Verify Third product price
      cy.get(":nth-child(4) > .product_sale_price > .value").should(
        "have.text",
        productData.chair_price
      );

      // Verify Third product total price
      cy.get(":nth-child(4) > .product_total_price > .value").should(
        "have.text",
        `$${chairTotal}`
      );
      // verify sub total of products
      cy.get(":nth-child(1) > .price").should("have.text", formattedSubtotal);
      // Verify shipping charges
      cy.get(":nth-child(2) > .price").should(
        "have.text",
        productData.shipping_price
      );
      // Verify the Order total of amount
      cy.get(":nth-child(3) > .price").should("have.text", orderTotal);
      // Verify the order id is provided or not
      cy.get(":nth-child(2) > .col-lg-6")
        .should("not.be.empty")
        .and(($element) => {
          const orderIdText = $element.text().trim();
          expect(orderIdText).to.not.be;
        });
    });
  });
});
