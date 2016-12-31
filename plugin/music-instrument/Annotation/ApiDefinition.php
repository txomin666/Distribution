<?php

namespace Claroline\MusicInstrumentBundle\Annotation;

/**
 * @Annotation
 * @Target("CLASS")
 */
class ApiDefinition
{
    /**
     * The definition of the entity in the API.
     *
     * @var string
     */
    private $class;

    public function __construct(array $args)
    {
        $this->validateArguments($args);

        $this->class = $args['value'];
    }

    protected function validateArguments(array $args)
    {
        if (!isset($args['value'])) {
            // Missing required args
            throw new \InvalidArgumentException('ApiDefinition requires a definition class name.');
        }

        if (1 < count($args)) {
            // Too many args
            $additional = array_filter(array_keys($args), function ($key) {
                return 'value' !== $key;
            });

            throw new \InvalidArgumentException(
                sprintf('Arguments "%s" does not exist.', implode('", "', $additional))
            );
        }

        if (!class_exists($args['value'])) {
            throw new \InvalidArgumentException(
                sprintf('Class "%s" does not exist.', $args['value'])
            );
        }

        // Params MUST be a class name and and the class MUST implements DefinitionInterface
        $reflect = new \ReflectionClass($args['value']);
        $interface = 'Claroline\MusicInstrumentBundle\Definitions\DefinitionInterface';
        if (!$reflect->implementsInterface($interface)) {
            throw new \InvalidArgumentException(
                vsprintf('"%s" must implement "%s".', [$args['value'], $interface])
            );
        }
    }

    /**
     * @return string
     */
    public function getClass()
    {
        return $this->class;
    }
}
