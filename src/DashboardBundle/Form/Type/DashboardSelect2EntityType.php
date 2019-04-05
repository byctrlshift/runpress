<?php

namespace DashboardBundle\Form\Type;

use Symfony\Component\Form\FormView;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormInterface;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\OptionsResolver\OptionsResolver;

/**
 * @author Ihor Drevetskyi <ihor.drevetskyi@gmail.com>
 */
class DashboardSelect2EntityType extends AbstractType
{
    /**
     * @return null|string
     */
    public function getParent()
    {
        return EntityType::class;
    }

    /**
     * @param FormView $view
     * @param FormInterface $form
     * @param array $options
     */
    public function buildView(FormView $view, FormInterface $form, array $options)
    {
        $view->vars['attr'] = $options['attr'];
        $view->vars['divLg'] = $options['divLg'];
        $view->vars['labelLg'] = $options['labelLg'];
        $view->vars['helpBlock'] = $options['helpBlock'];
        $view->vars['maxLength'] = $options['maxLength'];
        $view->vars['useFormGroup'] = $options['useFormGroup'];
    }

    /**
     * @param OptionsResolver $resolver
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'helpBlock' => null, 'maxLength' => null,  'useFormGroup' => true,
            'divLg' => 'col-lg-10', 'labelLg' => 'col-lg-2',
            'translation_domain' => 'DashboardBundle',
        ]);
    }
}