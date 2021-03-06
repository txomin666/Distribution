<?php

namespace UJM\LtiBundle\Form;

use Doctrine\ORM\EntityRepository;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class LtiResourceType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add('LtiApp', EntityType::class, [
            'class' => 'UJMLtiBundle:LtiApp',
            'query_builder' => function (EntityRepository $er) {
                return $er->createQueryBuilder('l')
                    ->orderBy('l.title', 'ASC');
            },
            'choice_label' => 'title',
            'label' => 'choice_app',
        ]);
        $builder->add(
            'name',
            TextType::class,
            [
                'label' => 'name_app',
                'attr' => ['autofocus' => true],
            ]
        );
        $builder->add(
            'openInNewTab',
            CheckboxType::class,
            [
                'label' => 'open_application_in_a_new_window',
            ]
        );
    }

    public function getName()
    {
        return 'ltiApp_form';
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(['translation_domain' => 'lti']);
    }
}
