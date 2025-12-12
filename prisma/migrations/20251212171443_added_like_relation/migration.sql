-- CreateTable
CREATE TABLE "_LikeRelation" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_LikeRelation_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_LikeRelation_B_index" ON "_LikeRelation"("B");

-- AddForeignKey
ALTER TABLE "_LikeRelation" ADD CONSTRAINT "_LikeRelation_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LikeRelation" ADD CONSTRAINT "_LikeRelation_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
