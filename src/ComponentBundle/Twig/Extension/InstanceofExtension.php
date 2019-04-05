<?php

namespace ComponentBundle\Twig\Extension;

use Twig\TwigFunction;
use Twig\Extension\AbstractExtension;

/**
 * @author Ihor Drevetskyi <ihor.drevetskyi@gmail.com>
 */
class InstanceofExtension extends AbstractExtension
{
    /**
     * @return array
     */
    public function getFunctions()
    {
        return [
            new TwigFunction('class', [$this, 'getClass'])
        ];
    }

    /**
     * @param $object
     * @return string
     * @throws \ReflectionException
     */
    public function getClass($object)
    {
        return (new \ReflectionClass($object))->getShortName();
    }
}
