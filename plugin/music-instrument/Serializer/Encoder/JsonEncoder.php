<?php

namespace Claroline\MusicInstrumentBundle\Serializer\Encoder;

class JsonEncoder implements EncoderInterface
{
    const FORMAT = 'json';

    public function support($format)
    {
        return static::FORMAT === $format;
    }

    public function encode($data)
    {
        return json_encode($data);
    }

    public function decode($data)
    {
        return json_decode($data);
    }
}
