//validation middleware
const asyncHandler = require('../../middleware/asyncHandler');
const ErrorResponse = require('../../utils/ErrorResponse');
const { validationCheck, findUniqueData } = require('../../middleware/validationCheck');

//models
const Book = require("../../models/librarybook/bookRequestIssued");
const LibraryBook = require("../../models/librarybook/librarybook");

/* 
* **************** Students related controller *****************
*/
exports.requestBook = asyncHandler(async (req, res) => {
    const { booksRequested, totalQty, requestedBy, contactNumber } = req.body;
    const validation = validationCheck({
        booksRequested, totalQty, requestedBy, contactNumber
    });
    if (!validation.status) {
        throw new ErrorResponse(`Please provide a ${validation?.errorAt}`, 400);
    }
    try {
        booksRequested.map(async itm => {
            const LibBook = await LibraryBook.findOne({ _id: itm })
            await LibraryBook.findOneAndUpdate({ _id: itm }, {
                totalReq: LibBook.totalReq + totalQty
            })
        })

        const dataCreated = await Book.create({
            booksRequested, totalQty, requestedBy, contactNumber, type: 'request'
        });

        return res.status(201).json({ success: true, data: dataCreated });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});

exports.cancelRequestBook = asyncHandler(async (req, res) => {
    const { id } = req.body;
    const validation = validationCheck({
        id
    });
    if (!validation.status) {
        throw new ErrorResponse(`Please provide a ${validation?.errorAt}`, 400);
    }
    try {
        const RequestData = await Book.findOne({ _id: id });

        RequestData?.booksRequested?.map(async itm => await LibraryBook.findOneAndUpdate({ _id: itm }, {
            totalReq: 0
        }))

        const dataCreated = await Book.deleteOne({ _id: id });

        return res.status(201).json({ success: true, data: "Request Cancelled Successfully!" });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});


/* 
* **************** Management / Admin related controller *****************
*/

exports.getLibraryBookRequested = asyncHandler(async (req, res) => {
    const { page, limit, populate, select } = req.query;
    try {
        const libData = await Book.find({ type: "request" }).select(select?.split(",")).limit(Number(limit)).skip(Number(page) * Number(limit)).sort({ createdAt: -1 }).populate(populate?.split(","));
        return res.status(200).json({ success: true, data: libData });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});

exports.getLibraryBookIssued = asyncHandler(async (req, res) => {
    const { page, limit, populate, select } = req.query;
    try {
        const libData = await Book.find({ type: "issue" }).select(select?.split(",")).limit(Number(limit)).skip(Number(page) * Number(limit)).sort({ createdAt: -1 }).populate(populate?.split(","));
        return res.status(201).json({ success: true, data: libData });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});


exports.modifyRequestBook = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { bookid, type, totalQty, returnBookDate } = req.body;

    const validation = type == 'issue' ? validationCheck({
        bookid, type, totalQty, returnBookDate
    }) : validationCheck({
        bookid, type
    });

    if (!validation.status) {
        throw new ErrorResponse(`Please provide a ${validation?.errorAt}`, 400);
    }

    try {
        const RequestData = await Book.findOne({ _id: id });
        const BookData = await LibraryBook.findOne({ _id: bookid });
        // Reject a  book
        if (type === 'reject') {
            if (RequestData?.booksRequested?.length == 1) {
                await Book.deleteOne({ _id: id });
            } else {
                await Book.findOneAndUpdate({ _id: id }, {
                    booksRequested: [...RequestData?.booksRequested?.filter(itm => { if (itm != bookid) return itm; })]
                })
            }
            await LibraryBook.findOneAndUpdate({ _id: bookid }, {
                totalReq: BookData.totalReq - RequestData?.totalQty
            })
            return res.status(201).json({ success: true, data: `Request for ${BookData.name} rejected successfully!` });
        }
        // Issue a  book
        if (type === 'issue') {
            if (totalQty <= RequestData.totalQty) {
                if (RequestData?.booksRequested?.length == 1) {
                    await Book.deleteOne({ _id: id });
                } else {
                    await Book.findOneAndUpdate({ _id: id }, {
                        booksRequested: [...RequestData?.booksRequested?.filter(itm => { if (itm != bookid) return itm; })]
                    })
                }
                await Book.create({
                    bookIssued: bookid,
                    totalQty,
                    issuedTo: RequestData.requestedBy,
                    returnBookDate,
                    type: 'issue'
                })

                await LibraryBook.findOneAndUpdate({ _id: bookid }, {
                    totalIssued: BookData.totalIssued + totalQty,
                    totalReq: BookData.totalReq - RequestData?.totalQty
                })

                return res.status(201).json({ success: true, data: "Book issued Successfully!" });
            }
            throw new ErrorResponse(`Book Quantity exceeded requested quantity`, 400);
        }
        // throw error if type not valid 
        throw new ErrorResponse(`Please provide a type (reject/issue)`, 400);
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});

exports.returnBooksIssued = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const validation = validationCheck({
        id,
    })

    if (!validation.status) {
        throw new ErrorResponse(`Please provide a ${validation?.errorAt}`, 400);
    }
    try {
        const RequestData = await Book.findOne({ _id: id });
        const BookData = await LibraryBook.findOne({ _id: RequestData.bookIssued });

        await Book.deleteOne({ _id: id });
        await LibraryBook.findByIdAndUpdate({ _id: RequestData.bookIssued }, {
            totalIssued: BookData.totalIssued - RequestData.totalQty,
            totalReturned: BookData.totalReturned + RequestData.totalQty
        })

        return res.status(201).json({ success: true, data: "Book returned Successfully!" });
    } catch (error) {
        throw new ErrorResponse(`Server error :${error}`, 400);
    }
});
