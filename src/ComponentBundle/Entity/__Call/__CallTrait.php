<?php

namespace ComponentBundle\Entity\__Call;

use Symfony\Component\PropertyAccess\PropertyAccess;

/**
 * @author Ihor Drevetskyi <ihor.drevetskyi@gmail.com>
 */
trait __CallTrait
{
    /**
     * @param $method
     * @param $arguments
     * @return mixed|null
     */
    public function __call($method, $arguments)
    {
        if ($method == '_action') {
            return null;
        }

        return PropertyAccess::createPropertyAccessor()->getValue($this->translate(), $method);
    }
}
