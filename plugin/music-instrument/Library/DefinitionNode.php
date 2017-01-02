<?php

namespace Claroline\MusicInstrumentBundle\Library;

use Claroline\MusicInstrumentBundle\Validator\Constraints\ConstraintInterface;

class DefinitionNode
{
    /**
     * @var null|DefinitionNode
     */
    protected $parent = null;
    private $name;
    private $constraints = [];

    public function __construct($name, DefinitionNode $parent = null)
    {
        $this->name = $name;
        $this->parent = $parent;
    }

    public function setParent(DefinitionNode $parent)
    {
        $this->parent = $parent;

        return $this;
    }

    /**
     * Add a constraint to the node.
     *
     * @param array $constraint
     *
     * @return DefinitionNode
     */
    public function addConstraint(array $constraint)
    {
        $reflect = new \ReflectionClass($constraint[0]);
        if (!($reflect->implementsInterface(ConstraintInterface::class))) {
            throw new \RuntimeException(
                sprintf('First argument only accepts classes that implement `%s`.', ConstraintInterface::class)
            );
        }

        if (isset($constraint[1]) && !is_array($constraint[1])) {
            throw new \RuntimeException(
                'Second argument should be an array of arguments to pass to the Constraint.'
            );
        }

        $this->constraints[] = $constraint;

        return $this;
    }

    /**
     * Finish the node definition.
     *
     * @return DefinitionNode
     */
    public function end()
    {
        return $this->parent;
    }
}
