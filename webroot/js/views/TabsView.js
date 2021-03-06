/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    var TabsView = Backbone.View.extend({
        render: function () {
            var tabsTemplate = contrail.getTemplate4Id(cowc.TMPL_TABS_VIEW),
                viewConfig = this.attributes.viewConfig,
                self = this, tabs = viewConfig['tabs'],
                validation = this.attributes.validation,
                lockEditingByDefault = this.attributes.lockEditingByDefault,
                modelMap = this.modelMap,
                childViewObj, childElId;

            self.$el.html(tabsTemplate(tabs));

            var tabsData = self.$el.find("#contrail-tabs").contrailTabs({
                active: contrail.handleIfNull(viewConfig.active, 0),
                activate: viewConfig.activate,
                theme: viewConfig.theme
            }).data('contrailTabs');

            for (var i = 0; i < tabs.length; i++) {
                childViewObj = tabs[i];
                childElId = childViewObj[cowc.KEY_ELEMENT_ID];
                cowu.renderView4Config(this.$el.find("#" + childElId), this.model, childViewObj, validation, lockEditingByDefault, modelMap);
            }
        }
    });

    return TabsView;
});