<?php

namespace Claroline\MusicInstrumentBundle\Serializer\Normalizer;

interface NormalizerInterface
{
    public function normalize();

    public function denormalize();
}
