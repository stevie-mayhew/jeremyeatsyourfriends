<?php

use Heyday\SilverStripe\WkHtml;

class HomePage extends Page
{

}

class HomePage_Controller extends Page_Controller
{

    private static $allowed_actions = array(
        'view',
        'room_image',
        'print_board',
        'house_rooms',
        'room_objects'
    );

    public function room_image()
    {
        $room = Room::get()->filter('URLSegment', $this->getRequest()->param('ID'))->first();
        return $this->renderWith(
            array('RoomImage','Page'),
            array(
                'RoomObjects' => $room->RoomObjects()
            )
        );
    }

    public function print_board()
    {
        $body = $this->getRequest()->getBody();
        $decoded = json_decode($body, true);
        $roomObjects = $decoded['roomObjects'];
        $houseImage = basename($decoded['houseImage'], '.svg');

        // save the room for later
        $room = new Room();
        $room->HouseImage = $houseImage;
        $room->write();

        $rooms = ArrayList::create();

        // fix for safari which doesn't support transform yet
        foreach($roomObjects as $key => $roomObject) {

            $roomObjectStyle = $roomObject['style'];
            $roomObjectStyle = explode('; ', $roomObjectStyle);
            foreach ($roomObjectStyle as $roomObjectKey => $style) {
                if (strpos($style, 'transform') !== false) {
                    $roomObjectStyle["-webkit-" . $style] = "-webkit-" .$style;
                }
            }
            $roomObject['style'] = implode('; ', $roomObjectStyle) . ';';
            $roomObjects[$key] = $roomObject;

            // save piece
            $houseObject = new RoomObject();
            foreach ($roomObject as $roomObjectKey => $roomObjectValue) {
                $houseObject->$roomObjectKey = $roomObjectValue;
            }

            $houseObject->RoomID = $room->ID;
            $houseObject->write();
        }


        $generator = new WkHtml\Generator(
            new \Knp\Snappy\Image(self::config()->get('wkhtml_path')),
            new \Heyday\SilverStripe\WkHtml\Input\Template(
                'RoomImage',
                ArrayData::create(
                    array(
                        'Room' => $room
                    )
                )
            ),
            new \Heyday\SilverStripe\WkHtml\Output\File(BASE_PATH . '/assets/Uploads/'. md5(time()) .'.jpg')
        );

        $imagePath = '';
        try {
            $imagePath = $generator->process();
        } catch (Exception $e) {
            error_log('error');
        }

        $image = new Image();
        $image->Filename = 'assets/Uploads/' . basename($imagePath);
        $image->Name = basename($imagePath);
        $image->ParentID = 1;
        $image->write();
        $room->ImageID = $image->ID;
        $room->write();

        return Director::absoluteURL('/home/view/' . $room->URLSegment);

    }

    public function house_rooms() {

        $rooms = $this->Rooms();
        $returnArray = array();

        foreach($rooms as $room) {


            $roomObjects = $room->RoomObjects();

            $returnArrayObjects = array();
            foreach ($roomObjects as $roomObject) {
                $returnArrayObjects[] = array(
                    'svgImage' => $roomObject->SVGImage()->URL,
                    'SVGImageID' => $roomObject->SVGImageID,
                    'identifier' => 'object-' . $roomObject->ID,
                    'roomObject' => $roomObject->ID,
                    'style' => $roomObject->style,
                    'x' => $roomObject->x,
                    'y' => $roomObject->y,
                );
            }
            $returnArray[] = array(
                'roomObjects' => $returnArrayObjects,
                'houseImage' => $room->House()->URL
            );



        }

        return json_encode($returnArray);
    }



    public function room_objects()
    {
        $roomObjects = $this->RoomObjects();
        $returnArray = array();
        foreach ($roomObjects as $roomObject) {
            $returnArray[] = array(
                'svgImage' => $roomObject->SVGImage()->Title,
                'SVGImageID' => $roomObject->SVGImageID,
                'identifier' => 'object-' . $roomObject->ID,
                'roomObject' => $roomObject->ID,
                'style' => $roomObject->style,
                'x' => $roomObject->x,
                'y' => $roomObject->y,
            );
        }

        return json_encode($returnArray);
    }


}
