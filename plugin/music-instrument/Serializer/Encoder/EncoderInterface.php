<?php

namespace Claroline\MusicInstrumentBundle\Serializer\Encoder;

interface EncoderInterface
{
    public function support($format);

    public function encode($data);

    public function decode($data);
}
