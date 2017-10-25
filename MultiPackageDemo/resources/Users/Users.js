Ext.define('Demo.users.UserFormModel', {extend:'Ext.app.ViewModel', alias:'viewmodel.users-userform', data:{userRec:null}});
Ext.define('Demo.users.UserForm', {extend:'Ext.form.Panel', xtype:'users-userform', requires:['Demo.users.UserFormModel'], viewModel:{type:'users-userform'}, bodyPadding:10, bind:{title:'User: {userRec.name}'}, items:[{xtype:'image', cls:'demo-users-avatar', bind:{src:'\x3c@Users\x3eavatars/{userRec.avatar}'}}, {xtype:'textfield', fieldLabel:'Name', bind:'{userRec.name}'}, {xtype:'textfield', fieldLabel:'Email', bind:'{userRec.email}'}, {xtype:'textfield', fieldLabel:'Phone', bind:'{userRec.phone}'}]});
Ext.define('Demo.users.Main', {extend:'Ext.panel.Panel', xtype:'usersmain', requires:['Ext.grid.Panel', 'Ext.tab.Panel', 'Ext.grid.column.Template', 'Demo.users.UserForm'], controller:'usersmain', title:'Users', layout:{type:'vbox', align:'stretch'}, defaults:{flex:1}, items:[{xtype:'grid', reference:'usersGrid', store:{type:'users'}, columns:[{xtype:'templatecolumn', text:'Name', flex:1, tpl:'\x3cimg class\x3d"demo-users-avatar" src\x3d"{avatar:resource("\x3c@Users\x3eavatars/")}"\x3e' + '\x3cdiv class\x3d"demo-user-bio"\x3e{name}\x3c/div\x3e'}, 
{text:'Email', dataIndex:'email', flex:1, cell:{userCls:'demo-users-cell'}}, {text:'Phone', dataIndex:'phone', width:150}], listeners:{select:'onItemSelected', itemdblclick:'onItemDblClick'}}, {xtype:'users-userform', reference:'selectedUser', bind:{title:'Selected User: {usersGrid.selection.name}', hidden:'{!usersGrid.selection}'}}, {xtype:'tabpanel', reference:'userDetailTabPanel'}]});
Ext.define('Demo.users.MainController', {extend:'Ext.app.ViewController', alias:'controller.usersmain', requires:['Ext.form.Panel', 'Ext.Img'], routes:{'users/:id':'loadUser', 'users/:id/:submodule':'loadUserSubModule'}, loadUser:function(id) {
  var usersGrid = this.lookup('usersGrid'), usersStore = usersGrid && usersGrid.getStore(), userRec = usersStore && usersStore.getById(id);
  if (userRec) {
    this.addUserToTabPanel(userRec);
    usersGrid.setSelection(userRec);
  }
}, loadUserSubModule:function(id, subModule) {
  console.log('loading user submodel ' + subModule);
}, onItemSelected:function(sender, record) {
  var selectedUser = this.lookup('selectedUser'), viewModel = selectedUser.getViewModel();
  viewModel.set('userRec', record);
}, onItemDblClick:function(view, record, item, index, e) {
  this.addUserToTabPanel(record);
}, addUserToTabPanel:function(record, tabLimit) {
  var userDetailTabPanel = this.lookup('userDetailTabPanel'), tabs = userDetailTabPanel.items, tabCount = tabs.getCount(), userForm = userDetailTabPanel.child('[userId\x3d' + record.data.id + ']'), userToRemove, i;
  if (!userForm) {
    if (tabLimit && tabCount >= tabLimit) {
      for (i = 0; i <= tabCount - tabLimit; i++) {
        userToRemove = tabs.getAt(0);
        userDetailTabPanel.remove(userToRemove);
      }
    }
    userForm = userDetailTabPanel.add({xtype:'users-userform', closable:true, userId:record.data.id, viewModel:{data:{userRec:record}}});
  }
  userDetailTabPanel.setActiveItem(userForm);
}, onConfirm:function(choice) {
  if (choice === 'yes') {
  }
}});
