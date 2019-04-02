<?php

namespace BackendBundle\Entity;

use IhorDrevetskyi\ComponentBundle\Entity\PosterAlt\PosterAltTrait;
use IhorDrevetskyi\ComponentBundle\Entity\Slug\SlugInterface;
use IhorDrevetskyi\ComponentBundle\Entity\Slug\SlugUniqueTrueTrait;
use IhorDrevetskyi\ComponentBundle\Entity\Title\TitleInterface;
use IhorDrevetskyi\ComponentBundle\Entity\Title\TitleTrait;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;
use Knp\DoctrineBehaviors\Model as ORMBehaviors;
use Symfony\Bridge\Doctrine\Validator\Constraints as UniqueEntity;

/**
 * VideoTranslation
 *
 * @Gedmo\Loggable
 * @ORM\Table(name="video_translation_table", indexes={
@ORM\Index(name="slug_idx", columns={"slug"}),
 *     })
 * @UniqueEntity\UniqueEntity(fields="slug")
 * @ORM\Entity
 * @author Ihor Drevetskyi <ihor.drevetskyi@gmail.com>
 */
class VideoTranslation implements TitleInterface, SlugInterface
{
    use ORMBehaviors\Timestampable\Timestampable,
        ORMBehaviors\Translatable\Translation;

    use TitleTrait;
    use SlugUniqueTrueTrait;
}
