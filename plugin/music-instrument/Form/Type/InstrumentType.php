<?php

namespace Claroline\MusicInstrumentBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class InstrumentType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add('name', 'text', ['required' => true]);
        $builder->add('published', 'checkbox', ['mapped' => false]);
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => 'Claroline\MusicInstrumentBundle\Entity\Instrument',
            'translation_domain' => 'resource',
        ]);
    }

    public function getName()
    {
        return 'music_instrument_form';
    }
}
