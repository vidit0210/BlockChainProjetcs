addBlock(block)
    {
        block.previousHash = this.chain[this.chain.length-1].hash;
        this.addBlock.hash = block._calculateHash();
        this.chain.push(block);
    }
