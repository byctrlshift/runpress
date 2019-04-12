<?php

namespace StaticBundle\EventListener;

use UploadBundle\Services\FileHandler;

/**
 * @author Ihor Drevetskyi <ihor.drevetskyi@gmail.com>
 */
final class FileUpdateListener extends \UploadBundle\EventListener\FileUpdateListener
{
    /**
     * FileUpdateListener constructor.
     * @param FileHandler $fileHandler
     */
    public function __construct(FileHandler $fileHandler)
    {
        parent::__construct($fileHandler, new FileUpdateConfig());
    }
}