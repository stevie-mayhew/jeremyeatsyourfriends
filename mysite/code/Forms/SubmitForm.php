<?php

class SubmitForm extends Form
{


    public function __construct($controller, $name)
    {


        $fields = FieldList::create(
            HiddenField::create('GameID', 'GameID')
        );

        $actions = FieldList::create(
            FormAction::create('doSubmit', 'Submit')
        );


        parent::__construct($controller, $name, $fields, $actions);

    }

    public function doSubmit($data, $form)
    {
        // lololol
        $this->getController()->redirectBack();

    }

}
