describe('Example', () => {
  beforeEach(async () => {
    await device.launchApp({ permissions: { notifications: 'YES', location: 'always' } });
  });


  it('should perform section', async () => {
    await expect(element(by.text('Welcome to Your App!'))).toBeVisible();

    await element(by.text('Go to Login')).tap();
    await element(by.id('email-input')).replaceText('varunrachakatla0708@gmail.com')
    await element(by.id('password-input')).replaceText('07089494')
    await expect(element(by.text('varunrachakatla0708@gmail.com'))).toBeVisible();
    await element(by.id('login-button')).tap();
    await expect(element(by.text('HomeScreen'))).toBeVisible()

    await element(by.text('Vendors')).tap();
    await element(by.text('select a location')).tap()
    await element(by.id('current_location_testid')).tap()

    // await expect(element(by.text('Please choose a more specific location'))).toBeVisible() 
    await element(by.text('Confirm location & proceed')).tap()

    await element(by.id('vendor_button_select_testid0')).tap();
   
    await element(by.id('select_vendor_screen_button_test_id')).tap();

    await expect(element(by.text('HomeScreen'))).not.toBeVisible()

    await expect(element(by.text('Women\'s Dress'))).toBeVisible()

    await element(by.text("Add")).tap()

    // await element(by.id("plus_stepper_testid")).tapAtPoint({x:22,y:22})

    await element(by.id('cart_icon_testid')).tapAtPoint({x:30,y:30})

    await element(by.id("cart_pay_buttoon_testid")).tap();

    await expect(element(by.text("Pay $50.00"))).toBeVisible();

    await element(by.text("Pay $50.00")).tap()

    await expect(element(by.text("OrdersScreen"))).toBeVisible()

    await element(by.id('orders_scroll_view_test_id')).scrollTo('bottom');

    await element(by.text('Account')).tap();

    await expect(element(by.text("Contact Information"))).toBeVisible()

    await element(by.id("logout_button_trstid")).tap();

    await expect(element(by.text('Welcome to Your App!'))).toBeVisible();

    await element(by.text('Go to Register')).tap();

    await element(by.id("email_register_textinput_testid")).replaceText("varun.rachakatla@gmail.com")

    await element(by.id("username_register_textinput_testid")).replaceText("vrachakatla")

    await element(by.id("password_register_textinput_testid")).replaceText("070894")

    await element(by.id("register_button_testid")).tap();

    await element(by.text("Welcome")).tap();
    await expect(element(by.text('Welcome to Your App!'))).toBeVisible();

  })
  
});