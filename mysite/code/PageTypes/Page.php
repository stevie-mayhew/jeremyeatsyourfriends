<?php

class Page extends SiteTree
{

    private static $has_one = array(
        'PreviewImage' => 'Image'
    );

    public function getCMSFields()
    {
        $this->beforeUpdateCMSFields(function ($fields) {
            $fields->addFieldToTab(
                'Root.Images',
                UploadField::create(
                    'PreviewImage',
                    'Page Preview Image'
                )->setRightTitle('Page Preview Image is used for third party image previews (such as Facebook) and should be at least <strong>200px</strong> by <strong>200px</strong>')
            );
        });

        $fields = parent::getCMSFields();

        return $fields;
    }


    public function onBeforeWrite()
    {
        if (!$this->MetaDescription) {
            $this->MetaDescription = $this->dbObject('Content')->FirstParagraph();
        }

        parent::onBeforeWrite();
    }

    public function getOGTitle()
    {
        return $this->MetaTitle ? : $this->Title;
    }

    public function getOGImage()
    {
        if ($this->PreviewImage() && $this->PreviewImage()->exists()) {
            return Director::absoluteURL($this->PreviewImage()->URL);
        }

        return Director::absoluteURL('themes/base/production/images/og_logo.png');
    }

}

class Page_Controller extends ContentController
{

    private static $allowed_actions = array();

    public function init()
    {

        parent::init();
        Requirements::block('swipestripe/javascript/Attribute_OptionField.js');
        Requirements::block('swipestripe/javascript/ProductForm.js');
        Requirements::block('swipestripe/javascript/OrderForm.js');
        Requirements::block('swipestripe/css/Shop.css');
        Requirements::block('swipestripe-addresses/javascript/Addresses_OrderForm.js');
        Requirements::block('swipestripe-flatfeeshipping/javascript/FlatFeeShippingModifierField.js');
        Requirements::block('framework/thirdparty/jquery/jquery.js');
        Requirements::block('framework/thirdparty/jquery-entwine/dist/jquery.entwine-dist.js');


    }

}
