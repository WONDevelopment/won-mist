/**
Template Controllers

@module Templates
*/

/**
The openExternalWallet import template

@class [template] popupWindows_openExternalWallet
@constructor
*/
Template['popupWindows_openExternalWallet'].onCreated(function() {
  var template = this;

  web3.won.personal.getListWallets().then(res => {
    // console.debug('Current wallet list:', res);
    var wallets = [];
    res.forEach(wallet => {
      console.debug(wallet.status, wallet.url);
      // wallets.push(wallet);
      if (!wallet.url.startsWith('keystore')) {
        wallets.push(wallet);
      }
    });

    TemplateVar.set(template, 'wallets', wallets);
  });
});

Template['popupWindows_openExternalWallet'].helpers({
  /**
    Show password

    @method showPassword
    */
  showPassword: function() {
    return TemplateVar.get('showPassword') ? 'text' : 'password';
  }
});

Template['popupWindows_openExternalWallet'].events({
  /**
     Closes the popup

     @event click .cancel
     */
  'click .cancel': function(e) {
    ipc.send('backendAction_closePopupWindow');
  },
  /**
     back to wallet list

     @event click .back
     */
  'click .back': function(e) {
    TemplateVar.set('inputPassword', false);
  },
  /**
    On show password

    @event click .show-password
    */
  'click .show-password': function(e) {
    TemplateVar.set('showPassword', e.currentTarget.checked);
  },
  /**
     Toggles dapp list selection.

     @event click .dapp-account-list button
     */
  'click .dapp-account-list button': function(e) {
    TemplateVar.set('inputPassword', true);
    TemplateVar.set('wallet-url', this.url);
  },
  /**
     Toggles keyboard click.

     @event click .keyboard button
     */
  'click .keyboard button': function(e, template) {
    e.preventDefault();

    var pw = template.find('input.password').value + e.currentTarget.id;
    template.find('input.password').value = pw;
  },
  /**
    Checks the password match sends the file path and password to the mist backend to import

    @event submit form
    */
  'submit form': function(e, template) {
    var pw = template.find('input.password').value;
    var url = TemplateVar.get('wallet-url');

    web3.won.personal.openWallet(url, pw, function(ret) {
      if (ret == null) {
        ipc.send('backendAction_closePopupWindow');
      } else {
        TemplateVar.set(template, 'errMsg', ret);
      }
    });

    // clear form
    template.find('input.password').value = '';
    pw = null;
  }
});
