<?php

namespace NewsBundle\Entity;

use Doctrine\Common\Collections\Collection;

/**
 * Interface NewsCollectionAwareInterface
 * @package NewsBundle\Entity
 * @author Ihor Drevetskyi <ihor.drevetskyi@gmail.com>
 */
interface NewsCollectionAwareInterface
{
    /**
     * @param News $news
     * @return bool
     */
    public function hasNews(NewsInterface $news): bool;
    
    /**
     * @return Collection
     */
    public function getNews(): Collection;

    /**
     * @param NewsInterface $news
     */
    public function addNews(NewsInterface $news): void;

    /**
     * @param NewsInterface $news
     */
    public function removeNews(NewsInterface $news): void;
}