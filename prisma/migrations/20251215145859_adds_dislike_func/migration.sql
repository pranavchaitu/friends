-- CreateTable
CREATE TABLE "_DislikeRelation" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_DislikeRelation_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_DislikeRelation_B_index" ON "_DislikeRelation"("B");

-- AddForeignKey
ALTER TABLE "_DislikeRelation" ADD CONSTRAINT "_DislikeRelation_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DislikeRelation" ADD CONSTRAINT "_DislikeRelation_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
