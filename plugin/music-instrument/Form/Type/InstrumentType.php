<?php

namespace Claroline\MusicInstrumentBundle\Form\Type;

use Doctrine\ORM\EntityRepository;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class InstrumentType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add('name', 'text', ['required' => true]);
        $builder->add('published', 'checkbox', ['mapped' => false]);
        $builder->add('type', 'entity', [
            'required' => true,
            'class' => 'ClarolineMusicInstrumentBundle:InstrumentType',
            'choice_label' => 'name',
            'query_builder' => function (EntityRepository $repository) {
                return $repository->createQueryBuilder('it')
                    ->where('it.enabled = true')
                    ->orderBy('it.name', 'ASC');
            },
        ]);
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
