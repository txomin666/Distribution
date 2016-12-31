<?php

namespace Claroline\MusicInstrumentBundle\Serializer\Encoder;

class ClarolineEncoder implements EncoderInterface
{
    const FORMAT = 'claroline';

    public function support($format)
    {
        return static::FORMAT === $format;
    }

    public function encode($data)
    {

    }

    public function decode($data)
    {

    }
}
