<?php

namespace Claroline\MusicBookBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class SongType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add('name', 'text', ['required' => true]);
        $builder->add('published', 'checkbox', ['mapped' => false]);
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => 'Claroline\MusicBookBundle\Entity\Song',
            'translation_domain' => 'resource',
        ]);
    }

    public function getName()
    {
        return 'song_form';
    }
}
