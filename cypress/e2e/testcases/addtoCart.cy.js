import tabs from "../support/tabs";
describe("add the products to cart", () => {
  let data1;
  let data2;
  beforeEach(() => {
    cy.fixture("credentials.json").then((data) => {
      data1 = data[0];
      data2 = data[1];
    });

    cy.visit("http://localhost/avactis/");
  });
  it("Add the products into cart", () => {
    cy.contains("a", "Sign In").click();
    // Login with valid credentials
    tabs.signin().click();
    tabs.email().type(data1.email);
    tabs.password().type(data1.password);
    tabs.signIn().click();
    //go to home screen
    tabs.sport().click();
    // Try to add one t-shirt into the cart
    cy.get("#ProductForm_126").click();
    cy.get('input[value="Add To Cart"]').click();
    cy.get(".ajax_message_box_text").should(
      "includes.text",
      "Product was added to your cart"
    );
    // Try to add one computer product into the cart
    cy.get(".dropdown-toggle").contains("Computers").trigger("mouseover");
    // The dropdown is not visible for Cypress, so we are using 'force: true' to click on the dropdown element
    cy.get(".dropdown-menu").contains("Notebooks").click({ force: true });
    cy.get("#ProductForm_8 > .product_buttons > .btn").click();
    cy.get(".ajax_message_box_text").should(
      "includes.text",
      "Product was added to your cart"
    );
    //Try to add one furniture product into the cart
    tabs.furniture().click();
    cy.get("#ProductForm_139 > .product_buttons > .btn").click();
    cy.get(".ajax_message_box_text").should(
      "includes.text",
      "Product was added to your cart"
    );
    // Verify the cart contains the items you were supposed to add to cart3
    cy.contains("a", "My cart").click();
    cy.get(
      ":nth-child(2) > .product_quantity_selector > .product-quantity > .form-control"
    ).select("1");
    cy.get(
      ":nth-child(3) > .product_quantity_selector > .product-quantity > .form-control"
    ).select("1", { force: true });
    cy.get(
      ":nth-child(4) > .product_quantity_selector > .product-quantity > .form-control"
    ).select("1");

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

      // Verify the amount is matching with product pricing and tax and shipping charges

      function totalProductPrice(
        quantitySelector,
        salePriceSelector,
        totalPriceSelector
      ) {
        cy.get(quantitySelector).then(($quantityElement) => {
          const quantityText = $quantityElement.text();
          const quantity = parseInt(quantityText);
          cy.log(`Quantity: ${quantity}`);

          cy.get(salePriceSelector).then(($salesPriceElement) => {
            const priceText = $salesPriceElement
              .text()
              .replace("$", "")
              .replace(",", "");
            const productPrice = parseFloat(priceText);
            cy.log(`productPrice: ${productPrice}`);

            const totalPrice = quantity * productPrice;
            cy.log(`totalPrice: ${totalPrice}`);
            // Caluculate total price of product
            cy.get(totalPriceSelector).then(($totalPriceElement) => {
              const totalPriceText = $totalPriceElement
                .text()
                .replace("$", "")
                .replace(",", "");

              const totalOfProductPrice = parseFloat(totalPriceText); // Use parseFloat for decimal values
              cy.log(`Total of Product Price: ${totalOfProductPrice}`);

              expect(totalOfProductPrice).to.equal(totalPrice);
            });
          });
        });
      }
      // Caluculate first product
      totalProductPrice(
        ":nth-child(2) > .product_quantity_selector",
        ":nth-child(2) > .product_sale_price > .value",
        ":nth-child(2) > .product_total_price > .value"
      );
      totalProductPrice(
        ":nth-child(3) > .product_quantity_selector",
        ":nth-child(3) > .product_sale_price > .value",
        ":nth-child(3) > .product_total_price .value"
      );
      totalProductPrice(
        ":nth-child(4) > .product_quantity_selector",
        ":nth-child(4) > .product_sale_price > .value",
        ":nth-child(4) > .product_total_price > .value"
      );
      cy.calculateSubtotal().then((subtotal) => {
        cy.log("Subtotal:", subtotal); // Output subtotal to the Cypress console
        // You can add assertions or further actions here
      });
    });
  });
});
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
cy.get(
  ":nth-child(2) > .product_quantity_selector > .product-quantity > .form-control"
).should("have.value", productData.qty);
// verify first product price
cy.get(":nth-child(2) > .product_sale_price > .value").should(
  "have.text",
  productData.price
);
// verfiy first product total price
cy.get(":nth-child(2) > .product_total_price > .value").should(
  "have.text",
  tShirtTotal
);
// Verify second product name quantity price and Total price

// Verify second product name
cy.get(":nth-child(3) > .product_data > .product_name").should(
  "contain.text",
  productData.laptop
);

//verify second product qty
cy.get(
  ":nth-child(3) > .product_quantity_selector > .product-quantity > .form-control"
).should("have.value", productData.qty);

// verfiy second product price
cy.get(":nth-child(3) > .product_sale_price > .value").should(
  "have.text",
  productData.laptop_price
);

// Verify second Product total price
cy.get(":nth-child(3) > .product_total_price > .value").should(
  "have.text",
  laptopTotal
);
// Verify Third product name quantity price and Total price

// Verify Third product name
cy.get(":nth-child(4) > .product_data > .product_name").should(
  "contain.text",
  productData.chair
);

// Verify Third product qty
cy.get(
  ":nth-child(4) > .product_quantity_selector > .product-quantity > .form-control"
).should("have.value", productData.qty);

// Verify Third product price
cy.get(":nth-child(4) > .product_sale_price > .value").should(
  "have.text",
  productData.laptop_price
);

// Verify Third product total price
cy.get(":nth-child(4) > .product_total_price > .value").should(
  "have.text",
  chairTotal
);
