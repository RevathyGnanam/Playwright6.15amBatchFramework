import{test,expect} from '@playwright/test'
import{TestConfig} from '../test.config'
import{RandomDataUtil} from '../utils/randomDataGenerator'
import{HomePage} from '../pages/HomePage'
import{RegistrationPage} from '../pages/RegistrationPage'

let config:TestConfig;
let homePage:HomePage;
let regpage:RegistrationPage;

test.beforeEach(async({page})=>{
 config= new TestConfig();
await page.goto(config.appurl);
 homePage= new HomePage(page);
 regpage= new RegistrationPage(page);
})

test.afterEach(async({page})=>{
    await page.waitForTimeout(3000);
    await page.close();
})

test('Account Registration @master @sanity @regression',async({page})=>{
await homePage.clickMyAccount()
await homePage.clickRegister()

//fill in random data in the registration form
 await regpage.setFirstName(RandomDataUtil.getFirstName())
     await regpage.setLastName(RandomDataUtil.getlastName())
     await regpage.setEmail(RandomDataUtil.getEmail())
     await regpage.setTelephone(RandomDataUtil.getPhoneNumber())

     const password = RandomDataUtil.getPassword()

      await regpage.setPassword(password)
       await regpage.setConfirmPassword(password)

       await regpage.setPrivacyPolicy();
       await regpage.clickContinue();

       //validate the confirmation message

       const confirmMsg = await regpage.getConfirmationMsg();
       console.log(confirmMsg)

       expect(confirmMsg).toContain('Your Account Has Been Created!')

})

